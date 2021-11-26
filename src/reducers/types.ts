export type Expense = {
  name: string;
  description: string;
  date: Date;
  _id: string;
};

export type ExpenseState = {
  expense: Expense | null;
  expensies: Expense[];
};
