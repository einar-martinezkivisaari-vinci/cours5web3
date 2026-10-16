// src/pages/expenses/ExpenseShow.loader.ts
import type { LoaderFunctionArgs } from 'react-router';
import type { Expense } from '../../types/Expense';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function expenseShowLoader({ params }: LoaderFunctionArgs): Promise<Expense> {
  // 1. fetch one expense, using params.id in the URL
  const response = await fetch(`${API_BASE_URL}/api/expenses/${params.id}`);

  if (!response.ok) {
    throw new Response('Could not load expenses', { status: response.status });
  }

  return response.json();
}