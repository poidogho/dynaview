import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Modal,
  Fade,
  Box,
  Backdrop,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import {
  getExpensies,
  deleteExpense,
  updateExpense
} from '../../actions/expense-actions';
import { RootState } from '../../store';
import { Expense } from '../models';
import { dateStringToDate, expenseTotals } from '../expense-logic';

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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const GetExpensies = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [expense, setExpense] = useState<Expense>({
    description: '',
    amount: 0,
    date: new Date(),
    _id: ''
  });
  const [description, setDescription] = useState(expense?.description);
  const [amount, setAmount] = useState(expense?.amount);
  const [date, setDate] = useState(expense?.date);

  const handleOpen = (expense: Expense) => {
    setExpense(expense);
    setDescription(expense.description);
    setAmount(expense.amount);
    setDate(expense.date);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleClickOpen = (expense: Expense) => {
    setDescription(expense.description);
    setAmount(expense.amount);
    setDate(expense.date);
    setOpen(true);
  };

  const expensies = useSelector<RootState, Expense[]>(
    (state) => state.expensies.expensies
  );

  const tax = useSelector<RootState, Number>((state) => state.expensies.tax);
  const taxInPercent = Number(tax) / 100;

  useEffect(() => {
    dispatch(getExpensies());
  }, [dispatch]);

  const deleteAnExpense = (expenseId: string) => {
    dispatch(deleteExpense(expenseId));
  };

  const editAnExpense = () => {
    const updatedExpense = {
      description,
      amount,
      date,
      _id: expense?._id
    };
    dispatch(updateExpense(updatedExpense));
  };

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
                      <Button
                        className={classes.editButton}
                        onClick={() => handleOpen(expense)}
                      >
                        Edit
                      </Button>
                      <Button
                        className={classes.deleteButton}
                        onClick={() => handleClickOpen(expense)}
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <TextField
              label="Date"
              value={date}
              type="date"
              onChange={(e) => setDate(new Date(e.target.value))}
            />
            <Button onClick={editAnExpense}>Update Expense</Button>
          </Box>
        </Fade>
      </Modal>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you want to delete Expense?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Deleting expense - ${description} is irreversible. Do you want to continue`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={handleClose} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GetExpensies;
