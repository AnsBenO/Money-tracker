import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import transactionsRouter from "./routes/transactionRouter";
import connectToDatabase from "./config/dbConnection";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(cors());

app.use(bodyParser.json());

app.use(async (_req, res, next) => {
	try {
		await connectToDatabase();
		next();
	} catch (error) {
		res.status(500).json({ error: "Failed to connect to the database" });
	}
});

app.use("/api", transactionsRouter);

app.use(errorHandler);

app.listen(port, () => {
	console.log("Server is listening on port: 6060");
});
