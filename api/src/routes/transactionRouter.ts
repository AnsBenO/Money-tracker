import express from "express";
import transactionController from "../controllers/transactionController";

const router = express.Router();

// GET: Fetch all transactions
router.get("/transactions", transactionController.getTransactions);

// POST: Add a transaction to the database
router.post("/transactions", transactionController.createTransaction);

// DELETE: Delete a transaction from the database
router.delete("/transactions/:id", transactionController.deleteTransaction);

export default router;
