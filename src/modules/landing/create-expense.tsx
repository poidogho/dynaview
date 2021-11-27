import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Container,
  Backdrop,
  Fade
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createExpense } from '../../actions/expense-actions';
import { RootState } from '../../store';

const useStyles = makeStyles({
  button: {
    justifyContent: 'flex-end',
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textdecoration: 'none',
    display: 'inline-block',
    fontSize: '16px'
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

const CreateExpense = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = () => {
    //  e.preventDeault();
    const expense = {
      description,
      amount,
      date
    };
    dispatch(createExpense(expense));
  };

  return (
    <div>
      <Button onClick={handleOpen} className={classes.button}>
        Create an Expense
      </Button>
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
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <TextField
              type="date"
              value={date}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
            <Button onClick={onSubmit}>SUBMIT</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateExpense;
