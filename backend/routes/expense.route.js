import express from "express";
import { addExpense, getExpenses, markAsDone, removeExpense, updateExpense } from "../controllers/expense.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";


const router = express.Router();

router.post("/addexpense", isAuthenticated, addExpense);
router.get("/getall", isAuthenticated, getExpenses);
router.delete("/remove/:id", isAuthenticated, removeExpense);
router.put("/update/:id", isAuthenticated, updateExpense);
router.put("/done/:id", isAuthenticated, markAsDone);

export default router;