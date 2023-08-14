import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const databaseUrl = process.env.DATABASE_URL;

const connectToDatabase = async (): Promise<void> => {
	try {
		await mongoose.connect(databaseUrl as string);
		console.log("Database connected successfully!");
	} catch (error) {
		console.error("Error connecting to the database:", error);
	}
};
export default connectToDatabase;
