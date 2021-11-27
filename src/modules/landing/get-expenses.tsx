import React, { useState } from 'react';
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
import { deleteExpense, updateExpense } from '../../actions/expense-actions';
import { RootState } from '../../store';
import { Expense } from '../models';
import { dateStringToDate, taxInPercent } from '../expense-logic';

const useStyles = makeStyles({
  editButton: {
    color: 'black !important',
    background: '#F9BE0B !important',
    padding: '5px !important',
    margin: '1px !important'
  },
  deleteButton: {
    color: 'white !important',
    background: '#F1200C !important',
    padding: '5px !important',
    margin: '1px !important'
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

interface ExpenseProp {
  expenses: Expense[];
}

const GetExpensies = ({ expenses }: ExpenseProp) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [_id, setId] = useState('');

  const handleOpen = (expense: Expense) => {
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

  const tax = useSelector<RootState, number>((state) => state.expensies.tax);

  const deleteAnExpense = (expenseId: string) => {
    dispatch(deleteExpense(expenseId));
  };

  const editAnExpense = () => {
    const updatedExpense = {
      description,
      amount,
      date,
      _id
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
            {expenses && expenses.length
              ? expenses.map((expense, index) => (
                  <TableRow key={index}>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                    <TableCell>
                      {Number(expense.amount) * Number(taxInPercent(tax))}
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

      {/* <Dialog
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
      </Dialog> */}
    </div>
  );
};

export default GetExpensies;
