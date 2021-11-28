import React from 'react';
import { Alert, Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Errors } from '../models';

interface ErrorProps {
  errors: Errors;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
}

const Error = ({ errors, setErrors }: ErrorProps) => {
  console.log(errors, 11111);
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      {errors.length
        ? errors.map((error, index) => (
            <Alert
              key={index}
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setErrors(errors.filter((_, i) => i !== index));
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          ))
        : undefined}
    </Stack>
  );
};

export default Error;
