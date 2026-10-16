import { useLoaderData } from "react-router";
import type { Expense } from "../../types/Expense";

const ExpenseShow = () => {
    
    const expense = useLoaderData() as Expense;

    return (
        <div style={{border: '1px solid black', padding: '10px', marginBottom: '10px'}}>
            <h3>Expense {expense.id}</h3>
            <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
            <p>Description: {expense.description}</p>
            {/* amount must be restricted to 2 decimal places */}
            <p>Amount: {expense.amount.toFixed(2)}</p>
            <p>Payer: {expense.payer.name}</p>
            <p>Email: {expense.payer.email}</p>
            <p>Banc Account: {expense.payer.bankAccount}</p>
            <p>Participants: {expense.participants.map(p => p.name).join(', ')}</p>
            {expense.category && <p style={{ color: expense.category.colour }}>Category: {expense.category.name}</p>}
        </div>
    );
}

export default ExpenseShow;