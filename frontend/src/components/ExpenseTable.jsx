import React, { useState, useEffect, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSelector } from "react-redux"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { Trash, Edit2 } from "lucide-react"
import UpdateExpense from "./UpdateExpense"
import axios from "axios"
import { toast } from 'sonner'

const ExpenseTable = () => {

  const { expenses } = useSelector(store => store.expense);
  const [localExpense, setLocalExepnse] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    setLocalExepnse(expenses)
  }, [expenses])

  const totalAmount = useMemo(() => {
    return localExpense.reduce((sum, expense) => sum + Number(expense.amount), 0);
  }, [localExpense]);

  const handleCheckBoxChange = async (expenseId) => {
    const newStatus = !checkedItems[expenseId];
    try {
      const res = await axios.put(`http://localhost:8000/api/v1/expense/done/${expenseId}`, { done: newStatus }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setCheckedItems((prev) => ({
          ...prev,
          [expenseId]: newStatus
        }))

        setLocalExepnse(localExpense.map(exp => exp._id === expenseId ? { ...exp, done: newStatus } : exp));
      }


    } catch (error) {
      console.log(error);
    }
  }

  const removeExpenseHander = async (expenseId) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/expense/remove/${expenseId}`);
      if (res.data.success) {
        toast.success(res.data.message);

        const filteredExpense = localExpense.filter((expense) => expense._id !== expenseId);
        setLocalExepnse(filteredExpense);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='my-10'>
      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px] whitespace-nowrap">Mark As Done</TableHead>
            <TableHead className="min-w-[200px]">Description</TableHead>
            <TableHead className="w-[120px]">Amount</TableHead>
            <TableHead className="w-[120px]">Category</TableHead>
            <TableHead className="w-[120px]">Date</TableHead>
            <TableHead className='text-right w-[140px]'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localExpense.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                Add your first expense.
              </TableCell>
            </TableRow>
          ) : localExpense?.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell className="font-medium">
                <Checkbox
                  checked={expense.done}
                  onCheckedChange={() => handleCheckBoxChange(expense._id)}
                  style={{
                    backgroundColor: expense.done ? '#16a34a' : 'transparent',
                    borderColor: expense.done ? '#16a34a' : '#d1d5db'
                  }}
                />
              </TableCell>
              <TableCell className={expense.done ? 'line-through' : ''}>{expense.description}</TableCell>
              <TableCell className={expense.done ? 'line-through' : ''}>{expense.amount}</TableCell>
              <TableCell className={expense.done ? 'line-through' : ''}>{expense.category}</TableCell>
              <TableCell className={expense.done ? 'line-through' : ''}>{expense.createdAt?.split("T")[0]}</TableCell>
              <TableCell className='text-right'>
                <div className='flex items-center justify-end gap-2'>
                  <Button onClick={() => removeExpenseHander(expense._id)} size='icon' className='rounded-full border border-red-600 hover:border-transparent' variant='outline'><Trash className='h-4 w-4 text-red-600'></Trash></Button>
                  {/* <Button size='icon' className='rounded-full border border-red-600 hover:border-transparent' variant='outline'><Edit2 className='h-4 w-4 text-red-600'></Edit2></Button> */}
                  <UpdateExpense expense={expense} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className='font-bold text-xl'>Total</TableCell>
            <TableCell className="text-right font-bold text-xl">Rs. {totalAmount.toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export default ExpenseTable