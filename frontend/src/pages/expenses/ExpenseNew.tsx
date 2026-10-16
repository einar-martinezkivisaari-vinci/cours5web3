import ExpenseAdd from "../../components/ExpenseAdd";
import useExpenses from "../../hooks/useExpenses";

const ExpenseNew = () => {
    const { addExpense } = useExpenses();
    return(
        <>
            <h1>Manage your expenses</h1>
            <ExpenseAdd expenseAdd={addExpense} />
        </>
    );
}

export default ExpenseNew;