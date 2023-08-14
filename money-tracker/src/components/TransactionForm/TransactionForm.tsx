import "./TransactionForm.css"
import { useState } from "react"
import FormData from "../../types/FormData"

interface TransactionForm {
    handleSubmit: (value: FormData) => void
}
const TransactionForm: React.FC<TransactionForm> = ({ handleSubmit }) => {

    const [formData, setFormData] = useState<FormData>({ name: "", description: "", price: 0, datetime: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "price") {
            const priceValue = value.replace(/[^0-9-]/g, "");
            setFormData((prevData) => ({ ...prevData, [name]: parseFloat(priceValue) }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };
    return (

        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleSubmit(formData);
        }} >
            <div className="form-group basic">
                <input type="text" name={"name"} className="name-input" onChange={handleChange} placeholder="name..." />
                <input type="datetime-local" name={"datetime"} className="date-input" onChange={handleChange} />
            </div>
            <div className="expense">
                <input type="text" name="price" className="price-input" onChange={handleChange} placeholder="+$200" />
            </div>
            <div className="form-group desc">
                <input type="text" name={"description"} className="desc-input" onChange={handleChange} placeholder="description..." />
            </div>

            <button type='submit'>Add Transaction</button>
        </form>


    );
}

export default TransactionForm;
