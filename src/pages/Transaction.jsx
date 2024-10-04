// src/components/Transaction.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const transactionData = [
    { id: 1, date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: 5.00, balance: 2082.79 },
    { id: 2, date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: 10.00, balance: 2087.79 },
    { id: 3, date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: 20.00, balance: 2097.79 },
    { id: 4, date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: 30.00, balance: 2117.79 },
    { id: 5, date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: 40.00, balance: 2147.79 },
    { id: 6, date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: 50.00, balance: 2187.79 },
  ];
  
  const Transaction = () => {
    const { accountId } = useParams();
    const [expandedTransaction, setExpandedTransaction] = useState(null);
  
    const toggleTransaction = (id) => {
      setExpandedTransaction(expandedTransaction === id ? null : id);
    };
  
    const ArrowIcon = ({ isExpanded }) => (
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
        >
          <path d="M8 12L1 5h14l-7 7z" fill="currentColor" />
        </svg>
      );
      
    return (
      <main className="main bg-dark">
        <div className="header">
          <h1>Argent Bank Checking (x{accountId})</h1>
          <h2 className="sr-only">$2,082.79 Available Balance</h2>
          <h2 className="balance">$2,082.79</h2>
          <p className="balance-description">Available Balance</p>
        </div>
        <div className="transaction-content">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>DATE</th>
                <th>DESCRIPTION</th>
                <th>AMOUNT</th>
                <th>BALANCE</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map((transaction) => (
                <React.Fragment key={transaction.id}>
                <tr onClick={() => toggleTransaction(transaction.id)}>
                  <td className="date-column">
                    <ArrowIcon isExpanded={expandedTransaction === transaction.id} />
                    {transaction.date}
                  </td>
                  <td>{transaction.description}</td>
                  <td>${transaction.amount.toFixed(2)}</td>
                  <td>${transaction.balance.toFixed(2)}</td>
                </tr>
                  {expandedTransaction === transaction.id && (
                    <tr className="transaction-details">
                      <td colSpan="4">
                        <div>Transaction Type: Electronic</div>
                        <div className="category-edit">
                          Category: 
                          <select defaultValue="Food">
                            <option>Food</option>
                            <option>Transportation</option>
                            <option>Housing</option>
                            <option>Utilities</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="notes-edit">
                          Notes: 
                          <input type="text" placeholder="Add a note" />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    );
  };
  
  export default Transaction;