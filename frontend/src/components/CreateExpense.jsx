import React, { useState } from 'react'
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
import { DialogClose } from '@radix-ui/react-dialog'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux'
import { setExpenses } from '../redux/expenseSlice'
const CreateExpense = () => {

    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: '',
    })
    const [loading,setLoading] = useState(false);
    const [open,setOpen] = useState(false);
    const {expenses} = useSelector((store) => store.expense);
    const dispatch =  useDispatch();
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
        console.log(formData);
        try{
            setLoading(true);
            const response = await axios.post('http://localhost:8000/api/v1/expense/addexpense',formData,{
                headers:{
                    "Content-Type" : 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials:true
            })
            if(response.data.success){
                dispatch(setExpenses([...expenses, response.data.expense]))
                toast.success(response.data.message);
                setOpen(false);
            }
        }
        catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className='mt-10'>
            <Dialog open={open} onOpenChange={setOpen}>
                <form onSubmit={handleSubmit}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setOpen(true)} variant="outline" className='bg-black text-white'>Add New Expense</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Expense</DialogTitle>
                            <DialogDescription>
                                Create expense and add it to your list.
                            </DialogDescription>
                        </DialogHeader>
                        <form action="">
                            <div className="grid gap-4 mb-10">
                                <div className="grid gap-3">
                                    <Label htmlFor="description">Description</Label>
                                    <Input id="description" name="description" placeholder="Enter description" value={formData.description} onChange={changeEventHandler} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input id="amount" name="amount" placeholder="Amount in Rs." value={formData.amount} onChange={changeEventHandler} />
                                </div>
                                <Select onValueChange={handleCategoryChange}>
                                    <Label htmlFor="category">Category</Label>
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
                            <DialogFooter>
                                {
                                    loading ? <Button className='w-full my-4'>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Adding...
                                    </Button> : 
                                    <Button type="submit">Add Expense</Button>
                                }
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    )
}

export default CreateExpense