import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button'
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { Edit2 } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setExpenses } from '../redux/expenseSlice'

const UpdateExpense = ({ expense }) => {
  const { expenses } = useSelector(store => store.expense);

  const [formData, setFormData] = useState({
    description: expense.description,
    amount: expense.amount,
    category: expense.category,
  })
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    setFormData({
      description: expense?.description,
      amount: expense?.amount,
      category: expense?.category
    })
  }, [expense])

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  const handleCategoryChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:8000/api/v1/expense/update/${expense._id}`, formData, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      })
      if (response.data.success) {
        // Update the expense in the list
        const updatedExpenses = expenses.map(exp =>
          exp._id === expense._id ? response.data.expense : exp
        );
        dispatch(setExpenses(updatedExpenses));
        toast.success(response.data.message);
        setOpen(false);
      }
    }
    catch (err) {
      console.log(err);
      toast.error("Failed to update expense");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size='icon' className='rounded-full border border-green-600 hover:border-transparent hover:text-green-600'>
            <Edit2 className='h-4 w-4 text-green-600' />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Expense</DialogTitle>
            <DialogDescription>
              Update your expense details.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-10">
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" placeholder="Enter description" value={formData.description} onChange={changeEventHandler} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" name="amount" placeholder="Amount in Rs." value={formData.amount} onChange={changeEventHandler} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={handleCategoryChange} value={formData.category}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              {
                loading ? <Button className='w-full my-4' disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </Button> :
                  <Button type="submit">Update Expense</Button>
              }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateExpense