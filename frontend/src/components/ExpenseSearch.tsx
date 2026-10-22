import { useForm } from "react-hook-form";
import useUsers from "../hooks/useUsers";
import useCategories from "../hooks/useCategories";
import { useSearchParams } from "react-router";

interface SearchFormValues {
  amount?: number;
  payerId?: string;
  categoryId?: string;
}

function ExpenseSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { register, handleSubmit } = useForm<SearchFormValues>({
    // keep the form in sync with the URL when the page is opened with filters already set
    defaultValues: {
      amount: searchParams.get('amount') ? Number(searchParams.get('amount')) : undefined,
      payerId: searchParams.get('payerId') ?? '',
      categoryId: searchParams.get('categoryId') ?? '',
    },
  });
  const { users } = useUsers();
  const { categories } = useCategories();

  const onSubmit = (data: SearchFormValues) => {
    const filter: Record<string, string> = {};
    if (data.amount) filter.amount = String(data.amount);
    if (data.payerId) filter.payerId = data.payerId;
    if (data.categoryId) filter.categoryId = data.categoryId;

    setSearchParams(filter);
  };

  return (
    <div>
      <h3>Search expenses</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" placeholder="Filter by amount" {...register("amount")} />

        <label htmlFor="payerId">Payer</label>
        <select id="payerId" {...register("payerId")}>
          <option value="">All payers</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <label htmlFor="categoryId">Category</label>
        <select id="categoryId" {...register("categoryId")}>
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default ExpenseSearch;
