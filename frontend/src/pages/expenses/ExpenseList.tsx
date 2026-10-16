import ExpenseItem from "../../components/ExpenseItem";
import { useLoaderData } from "react-router";
import type { Expense } from "../../types/Expense";
import ExpenseSearch from "../../components/ExpenseSearch";

const ExpenseList = () => {
    
    const expenses = useLoaderData() as Expense[];

    return(
        <>
            <h2>Your expenses</h2>
            {expenses.length > 0 && <ExpenseSearch />}
            <ul>
            {[...expenses ?? []].map((expense) => (
                <li key={expense.id}>
                <ExpenseItem expense={expense} />
                </li>
            ))}
            </ul>
        </>
    );
}

export default ExpenseList;