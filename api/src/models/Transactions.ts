import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({
	_id: { type: Schema.Types.ObjectId, auto: true, required: true },
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	datetime: { type: Date, required: true },
});

const TransactionModel = model("Transaction", TransactionSchema);

export default TransactionModel;
