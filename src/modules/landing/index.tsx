import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CreateExpense from './create-expense';
import GetExpensies from './get-expenses';
import { getExpensies } from '../../actions/expense-actions';
import { RootState } from '../../store';
import { expenseTotals, trimValues } from '../expense-logic';
import { Expense } from '../models';

const useStyles = makeStyles({
  headings: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  items: {}
});

const Index = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const expenses = useSelector<RootState, Expense[]>(
    (state) => state.expensies.expensies
  );

  useEffect(() => {
    dispatch(getExpensies());
  }, [dispatch]);

  const { sumWithTax, sumWithoutTax } = expenseTotals(expenses);

  return (
    <>
      <Container>
        <h1>Expense tracker</h1>
        <div className={classes.headings}>
          <div>
            <p>The sub-total of expenses is {trimValues(sumWithoutTax)} $</p>
            <p>The total with taxes is {trimValues(sumWithTax)} $</p>
          </div>
          <div>
            <CreateExpense />
          </div>
        </div>

        <GetExpensies expenses={expenses} />
      </Container>
    </>
  );
};

export default Index;
