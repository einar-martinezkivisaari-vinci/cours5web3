import * as z from "zod";

import { type User } from "./User";
import { type Category } from "./Category";

export interface Expense {
  id: number;
  date: string;
  description: string;
  amount: number;
  payer: User;
  participants: User[];
  category?: Category;
}

export interface ExpenseListItem {
  id: number;
  date: string;
  description: string;
  amount: number;
  payer: Pick<User, "name">;
  category?: Category;
}

export const ExpenseFormSchema = z.object({
  description: z.string().min(1, "Description is required"),
  payerId: z.number().int().positive("Payer ID must be a positive integer"),
  amount: z.number().positive("Amount must be positive"),
  date: z.string().min(1, "Date is required"),
  participantsRaw: z.string(),
  categoryId: z.number().int().optional(),
});

export type ExpenseFormValues = z.infer<typeof ExpenseFormSchema>;

export interface NewExpense {
  description: string;
  amount: number;
  date: string;
  payerId: number;
  participants: number[];
  categoryId?: number;
}