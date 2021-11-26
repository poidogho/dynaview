import { combineReducers } from 'redux';
import { ExpenseReducer } from './expense-reducer';

const rootReducer = combineReducers({
  expensies: ExpenseReducer
});

export default rootReducer;
