import { Dispatch } from 'redux';
import { axios, getServer } from '../utils';
import { GET_EXPENSIES, ERROR } from './types';

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
