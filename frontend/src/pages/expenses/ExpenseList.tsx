import { useState } from "react";
import useExpenses from "../../hooks/useExpenses";
import type { Expense } from "../../types/Expense";
import ExpenseSorter from "../../components/ExpenseSorter";
import ExpenseSearch from "../../components/ExpenseSearch";
import ExpenseItem from "../../components/ExpenseItem";

const ExpenseList = () => {
    
    const { expenses, searchExpenses } = useExpenses();
    const [sortingAlgo, setSortingAlgo] = useState<(a: Expense, b: Expense) => number>(() => () => 1);

    const handleAlgoChange = (algo: (a: Expense, b: Expense) => number) => {
        setSortingAlgo(() => algo); // We're wrapping algo in a function because useState setter accept either a value or a function returning a value.
    };

    return(
        <>
            <h2>Your expenses</h2>
            {expenses.length > 0 && <ExpenseSorter setSortingAlgo={handleAlgoChange} />}
            {expenses.length > 0 && <ExpenseSearch searchExpenses={searchExpenses} />}
            <ul>
            {[...expenses ?? []].sort(sortingAlgo).map((expense) => (
                <li key={expense.id}>
                <ExpenseItem expense={expense} />
                </li>
            ))}
            </ul>
        </>
    );
}

export default ExpenseList;