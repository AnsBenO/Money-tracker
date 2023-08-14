import { useCallback, useEffect, useState } from 'react';
import './App.css';
import TransactionForm from './components/TransactionForm/TransactionForm';
import TransactionItem from './components/TransactionItem/TransactionItem';
import FormData from './types/FormData';
import axios from 'axios';
import { formatPrice } from './helpers/formatingHelpers.ts';
import { REACT_APP_API_URL } from './constants.ts';

const apiUrl = REACT_APP_API_URL;

function App() {

  const [transactions, setTransactions] = useState<TransactionItem[]>([]);

  const [reloadData, setReloadData] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(true);


  const calculateTotal = useCallback(() => {
    const expenses = transactions.map(tr => tr.price);
    const total = expenses.reduce((prevValue, currValue) => prevValue + currValue, 0);
    return total;
  }, [transactions]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${apiUrl as string}/api/transactions`)
      .then(res => res.data as TransactionItem[])
      .then((data) => {
        setTransactions(data)
        setReloadData(false)
        setLoading(false);
      }).catch(err => console.error(err));

  }, [reloadData])

  const addTransaction = (formData: FormData) => {

    axios.post(`${apiUrl as string}/api/transactions`, formData)
      .then(res => {
        console.log(res.data);
        setReloadData(true);
      })
      .catch(err => console.error("Error Adding Transaction", err))
  };



  const removeTransaction = (_id: number) => {
    axios
      .delete(`${apiUrl as string}/api/transactions/${_id}`)
      .then((response) => {
        const updatedTransactions = transactions.filter((transaction) => transaction._id !== _id);
        console.log(response.data);
        setTransactions(updatedTransactions);
        setReloadData(true)
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
      });
  }


  return (
    <main>
      <h1 className={`total ${calculateTotal() && calculateTotal() > 0 ? 'green' : (calculateTotal() === 0 ? '' : 'red')}`}  >{calculateTotal() && transactions.length > 0 ? formatPrice(calculateTotal()) : "$0.00"}</h1>
      <TransactionForm handleSubmit={addTransaction} />
      <div className={`transactions ${loading ? 'loading' : ''}`}>
        {loading && <div className="loader-container">
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
        </div>}
        {transactions.map((tr, index) => <TransactionItem {...tr} key={index} onRemove={() => removeTransaction(tr._id)} />)}
      </div>
    </main>
  )
}

export default App;

