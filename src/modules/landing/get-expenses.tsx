import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { getExpensies, deleteExpense } from '../../actions/expense-actions';
import { RootState } from '../../store';

type expense = {
  description: string;
  amount: Number;
  date: Date;
  _id: string;
};

const useStyles = makeStyles({
  editButton: {
    color: 'black',
    background: '#F9BE0B',
    padding: '5px',
    margin: '1px'
  },
  deleteButton: {
    color: 'white',
    background: '#F1200C',
    padding: '5px',
    margin: '1px'
  }
});

const GetExpensies = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const expensies = useSelector<RootState, expense[]>(
    (state) => state.expensies.expensies
  );

  const tax = useSelector<RootState, Number>((state) => state.expensies.tax);
  const taxInPercent = Number(tax) / 100;

  useEffect(() => {
    dispatch(getExpensies());
  }, [dispatch]);

  const deleteExpense = (expenseId: string) => {
    dispatch(deleteExpense(expenseId));
  };

  const dateStringToDate = (dateStr: string) => {
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

  console.log(dateStringToDate('2021-11-27T23:49:54.981Z'));

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Taxes ({tax}%)</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expensies && expensies.length
              ? expensies.map((expense, index) => (
                  <TableRow key={index}>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                    <TableCell>
                      {Number(expense.amount) * Number(taxInPercent)}
                    </TableCell>
                    <TableCell>
                      {dateStringToDate(expense.date.toString())}
                    </TableCell>
                    <TableCell>
                      <Button className={classes.editButton}>Edit</Button>
                      <Button
                        className={classes.deleteButton}
                        onClick={() => deleteExpense(expense._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : undefined}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GetExpensies;
