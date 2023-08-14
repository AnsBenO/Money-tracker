import { NextFunction, Request, Response } from "express";
import Transaction from "../models/Transactions";
import { asyncHandler } from "../utils/asyncHandler";

// GET: Fetch all transactions
const getTransactions = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const transactions = await Transaction.find();
			if (!transactions) {
				res.status(404);
				throw new Error("No Transactions found");
			}
			res.status(200).json(transactions);
		} catch (error) {
			// res.status(500).json({ error: "Failed to fetch Data" });
			res.status(500);
			return next(error);
		}
	}
);

// POST: Add a transaction to the database
const createTransaction = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, description, price, datetime } = req.body;
			const transaction = await Transaction.create({
				name,
				description,
				price,
				datetime,
			});
			res.status(200).json(transaction);
		} catch (error) {
			// res.status(500).json({ error: "Failed to add Transaction" });
			return next(error);
		}
	}
);

// DELETE: Delete a transaction from the database
const deleteTransaction = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			const deleteTransaction = await Transaction.findByIdAndDelete(id);
			if (!deleteTransaction) {
				res.status(404).json({ error: "Transaction not found" });
				throw new Error("Transaction not found");
			}
			res.status(200).json({
				message: "Transaction deleted successfully.",
				Transaction: deleteTransaction,
			});
		} catch (error) {
			res.status(500);
			return next(error);
		}
	}
);

export default {
	getTransactions,
	createTransaction,
	deleteTransaction,
};
