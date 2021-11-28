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
      return {
        ...state,
        expense: action.payload
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
