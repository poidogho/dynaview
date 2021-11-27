import { Expense } from './models';

export const tax = 15;

export const dateStringToDate = (dateStr: string) => {
  const date = new Date(dateStr);
  let time = dateStr.split('T')[1].split(':');
  const [mins, secs] = time;
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  if (Number(day) < 10) day = `0${day}`;
  if (Number(month) < 10) month = `0${month}`;

  return `${year}-${month}-${day} at ${mins}:${secs}`;
};

export const taxInPercent = (tax: number) => {
  return tax / 100;
};

export const expenseTotals = (
  expenses: Expense[]
): { sumWithoutTax: number; sumWithTax: number } => {
  let sumWithoutTax = 0;
  let sumWithTax = 0;
  expenses.forEach((expense) => {
    sumWithoutTax += expense.amount;
    sumWithTax += expense.amount * taxInPercent(tax);
  });
  sumWithTax = parseFloat(
    Math.round(((sumWithTax + sumWithoutTax) * 100) / 100).toFixed(2)
  );
  return { sumWithoutTax, sumWithTax };
};