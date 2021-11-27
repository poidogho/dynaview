import { Dispatch } from 'redux';
import { axios, getServer } from '../utils';
import { GET_EXPENSIES, CREATE_EXPENSE, ERROR, DELETE_EXPENSE } from './types';
import { Expense } from '../reducers/types';

const server = getServer();

export const getExpensies = () => async (dispatch: Dispatch) => {
  await axios
    .get(`${server}/api/expensies`)
    .then((res) => {
      dispatch({
        type: GET_EXPENSIES,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: err
      });
    });
};

export const createExpense =
  (expense: Expense) => async (dispatch: Dispatch) => {
    axios
      .post(`${server}/api/expensies`, expense)
      .then((res) =>
        dispatch({
          type: CREATE_EXPENSE,
          payload: res.data
        })
      )
      .catch((err) => dispatch({ type: ERROR, payload: err }));
  };

export const deleteExpense =
  (expenseId: string) => async (dispatch: Dispatch) => {
    axios
      .delete(`${server}/api/expensies/${expenseId}`)
      .then((res) => dispatch({ type: DELETE_EXPENSE, payload: res.data }))
      .catch((err) => dispatch({ type: ERROR, payload: err }));
  };
