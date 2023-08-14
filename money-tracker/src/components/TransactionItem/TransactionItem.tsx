import { formatPrice, formatDate } from "../../helpers/formatingHelpers";
import "./TransactionItem.css"
interface TransactionItem {
    _id: number;
    name: string;
    description: string;
    price: number;
    datetime: string;
    onRemove: (id: number) => void;
}
const TransactionItem: React.FC<TransactionItem> = ({ _id, name, description, price, datetime, onRemove }) => {

    return (
        <div className="transaction">
            <span className="remove-btn" onClick={() => onRemove(_id)}><i className="fa-solid fa-xmark"></i></span>
            <div className="left">
                <div className='name'>{name}</div>
                <div className="desc">{description}</div>
            </div>
            <div className="right">
                <div className={`price ${price < 0 ? 'red' : 'green'}`}>{formatPrice(price)}</div>
                <div className="datetime">{formatDate(datetime)}</div>
            </div>
        </div>
    );
}

export default TransactionItem;
