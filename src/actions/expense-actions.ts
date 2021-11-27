import { Dispatch } from 'redux';
import { axios, getServer } from '../utils';
import { GET_EXPENSIES, CREATE_EXPENSE, ERROR, DELETE_EXPENSE } from './types';
import { Expense } from '../reducers/types';

const server = getServer();

export const getExpensies = () => async (dispatch: Dispatch) => {
  await axios
    .get(`${server}/api/expenses`)
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
      .post(`${server}/api/expenses`, expense)
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
      .delete(`${server}/api/expenses/${expenseId}`)
      .then((res) => dispatch({ type: DELETE_EXPENSE, payload: res.data }))
      .catch((err) => dispatch({ type: ERROR, payload: err }));
  };

export const updateExpense =
  (expense: Expense) => async (dispatch: Dispatch) => {
    const expenseId = expense._id;
    axios
      .patch(`${server}/api/expenses/${expenseId}`, expense)
      .then((res) => console.log(res));
  };
