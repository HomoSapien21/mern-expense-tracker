import Expense from "../models/expense.model.js";

export const addExpense = async (req, res) => {
    try {
        const { description, amount, category } = req.body;
        const userId = req.id;

        if (!description || !amount || !category) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        const expense = await Expense.create({
            description,
            amount,
            category,
            userId
        })

        return res.status(200).json({
            message: "New Expense Added.",
            success: true,
            expense
        })

    } catch (error) {
        console.log(error);
    }
}

export const getExpenses = async (req, res) => {
    try {
        const userId = req.id;
        let category = req.query.category || 'all';
        const done = req.query.done || 'both';

        const query = {
            userId
        }

        // Handle category filter
        if (category.toLowerCase() !== "all") {
            query.category = { $regex: category, $options: "i" }
        }

        // Handle done/undone filter
        if (done.toLowerCase() === "done") {
            query.done = true;
        } else if (done.toLowerCase() === "undone" || done.toLowerCase() === "pending") {
            query.done = false;
        }
        // If 'both', don't add done filter to query

        const expense = await Expense.find(query);

        if (expense.length === 0 || !expense) {
            return res.status(404).json({
                message: "No expenses found",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            expense
        })


    } catch (error) {
        console.log(error);
    }
}

export const markAsDone = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const done = req.body;
        const expense = await Expense.findByIdAndUpdate(expenseId, done, { new: true });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found",
                success: false
            })
        }

        return res.status(200).json({
            message: `Expense marked as ${expense.done ? 'done' : 'pending'}`,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const removeExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        await Expense.findByIdAndDelete(expenseId);
        return res.status(200).json({
            message: "Expense Removed.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateExpense = async (req, res) => {
    try {
        const { description, amount, category } = req.body;
        const expenseId = req.params.id;
        const updateData = { description, amount, category };

        const expense = await Expense.findByIdAndUpdate(expenseId, updateData, { new: true });
        return res.status(200).json({
            message: "Expense Updated.",
            success: true,
            expense
        })

    } catch (error) {
        console.log(error);
    }
}