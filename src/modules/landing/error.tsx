import React from 'react';
import { Alert, Stack } from '@mui/material';
import { Errors } from '../models';

interface ErrorProps {
  errors: Errors;
}

const Error = ({ errors }: ErrorProps) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      {errors.length
        ? errors.map((error) => (
            <Alert onClose={() => {}} severity="error">
              {error}
            </Alert>
          ))
        : undefined}
    </Stack>
  );
};

export default Error;
