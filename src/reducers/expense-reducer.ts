import { GET_EXPENSIES, ERROR } from '../actions/types';
import { ExpenseState } from './types';

const initialState: ExpenseState = {
  expense: null,
  expensies: []
};

export function ExpenseReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_EXPENSIES:
      return {
        ...state,
        courses: action.payload
      };
    default:
      return state;
  }
}
