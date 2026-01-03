import React from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setMarkAsDone } from '../redux/expenseSlice'
import CreateExpense from './CreateExpense'
import ExpenseTable from './ExpenseTable'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import useGetExpenses from '../hooks/useGetExpenses'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Home = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);

  // Only fetch expenses if user is authenticated
  useGetExpenses();

  const handleCategoryChange = (value) => {
    dispatch(setCategory(value));
  }

  const changeDoneHandler = (value) => {
    dispatch(setMarkAsDone(value));
  }

  // If user is not authenticated, show login/signup prompt
  if (!user) {
    return (
      <div>
        <Navbar />
        <div className='flex items-center justify-center min-h-[80vh]'>
          <div className='w-full max-w-md p-8 shadow-lg rounded-lg border bg-card text-card-foreground'>
            <div className='text-center space-y-6'>
              <h1 className='text-3xl font-bold'>Welcome to Expense Tracker</h1>
              <p className='text-lg text-muted-foreground'>
                Please Login or Signup to continue
              </p>
              <div className='flex flex-col gap-3 pt-4'>
                <Link to='/login'>
                  <Button className='w-full' size='lg'>
                    Login
                  </Button>
                </Link>
                <Link to='/signup'>
                  <Button className='w-full' variant='outline' size='lg'>
                    Signup
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto pt-10'>
        <div className='flex items-center justify-between mb-5'>
          <h1>Expenses</h1>
          <CreateExpense />
        </div>
        <div className='flex items-center gap-4 mb-5'>
          <h2 className='font-medium text-lg whitespace-nowrap'>Filter By:</h2>
          <Select onValueChange={handleCategoryChange} className='max-w-[150px]'>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="others">Others</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={changeDoneHandler} className='max-w-[150px]'>
            <SelectTrigger>
              <SelectValue placeholder="Mark As" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="undone">Undone</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ExpenseTable />
      </div>
    </div>
  )
}

export default Home