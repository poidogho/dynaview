export type Expense = {
  description: string;
  amount: number;
  date: Date;
  _id?: string;
};

export type ExpenseState = {
  expense: Expense | null;
  expensies: Expense[];
  tax: Number;
};
