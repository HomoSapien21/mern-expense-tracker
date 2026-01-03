import React from 'react'
import { Link } from 'react-router-dom'
import expensesLogo from '../../assets/expenses.jpg'

const Logo = () => {
    return (
        <Link to="/">
            <img src={expensesLogo} alt="logo" className='w-20' />
        </Link>
    )
}

export default Logo