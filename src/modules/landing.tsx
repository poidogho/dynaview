import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpensies } from '../actions/expense-actions';
import { RootState } from '../store';

type expense = {
  name: string;
  description: string;
  date: Date;
  _id: string;
};

const Landing = () => {
  const dispatch = useDispatch();
  const expensies = useSelector<RootState, expense[]>(
    (state) => state.expensies.expensies
  );

  useEffect(() => {
    dispatch(getExpensies());
  }, [dispatch]);

  console.log(expensies, 1111);
  return (
    <div>
      <div>
        {expensies.map((expense) => (
          <li>{expense.description}</li>
        ))}
      </div>
    </div>
  );
};

export default Landing;
