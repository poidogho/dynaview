import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Modal, TextField, Backdrop, Fade } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Error from './error';
import { createExpense } from '../../actions/expense-actions';
import { validateInput, defaultDate } from '../expense-logic';

const useStyles = makeStyles({
  button: {
    backgroundColor: '#4CAF50 !important',
    border: 'none !important',
    color: 'white !important',
    padding: '8px 16px !important',
    textdecoration: 'none !important',
    display: 'inline-block !important',
    fontSize: '8px'
  }
});

const itemsSpacing = {
  margin: '5px'
};

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

  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(defaultDate(new Date()));
  const [errors, setErrors] = useState<string[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = () => {
    const expense = {
      description,
      amount,
      date: new Date(date)
    };

    const errors = validateInput(expense);
    if (errors.length) {
      setErrors(errors);
    } else {
      dispatch(createExpense(expense));
      setOpen(false);
      setDescription('');
      setAmount(0);
    }
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
            <h2>Create An Expense</h2>
            <TextField
              fullWidth
              required
              label="Decription"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={itemsSpacing}
            />
            <TextField
              fullWidth
              required
              label="Amount"
              type="number"
              value={amount || ''}
              style={itemsSpacing}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <TextField
              fullWidth
              required
              label="Date"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={itemsSpacing}
            />
            {errors.length ? <Error errors={errors} /> : undefined}
            <Button onClick={onSubmit}>SUBMIT</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateExpense;
