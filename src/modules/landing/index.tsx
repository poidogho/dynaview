import React from 'react';
import { Container } from '@mui/material';
import CreateExpense from './create-expense';
import GetExpensies from './get-expenses';

const Index = () => {
  return (
    <Container>
      <h1>Expense tracker</h1>
      <CreateExpense />
      <GetExpensies />
    </Container>
  );
};

export default Index;
