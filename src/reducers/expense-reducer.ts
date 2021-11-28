import { Console } from 'console';
import {
  GET_EXPENSIES,
  CREATE_EXPENSE,
  ERROR,
  UPDATE_EXPENSE,
  DELETE_EXPENSE
} from '../actions/types';
import { ExpenseState } from './types';

const initialState: ExpenseState = {
  expense: null,
  expensies: [],
  tax: 0
};

export function ExpenseReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_EXPENSIES:
      return {
        ...state,
        expensies: action.payload.expensies,
        tax: action.payload.tax
      };
    case CREATE_EXPENSE:
      return {
        ...state,
        expensies: [...state.expensies, action.payload.expense]
      };
    case UPDATE_EXPENSE:
      const updatedExpense = action.payload.expense;
      const expenseIdx = state.expensies.findIndex(
        (expense) => expense._id === updatedExpense._id
      );
      const updatedExpenses = [...state.expensies];
      updatedExpenses[expenseIdx] = {
        _id: updatedExpense._id,
        description: updatedExpense.description,
        amount: updatedExpense.amount,
        date: updatedExpense.date
      };
      return {
        ...state,
        expensies: updatedExpenses
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expense: null
      };
    default:
      return state;
  }
}
