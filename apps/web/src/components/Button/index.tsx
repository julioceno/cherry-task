import { Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';
import { useStyles } from './styles';

interface IPrimaryButtonProps extends ButtonProps {
  children: ReactNode;
}

function PrimaryButton({ children, ...rest }: IPrimaryButtonProps) {
  const classes = useStyles();

  return (
    <Button
      variant='outlined'
      color='secondary'
      className={classes.root}
      style={{ borderRadius: 30 }}
      {...rest}
    >
      {children}
    </Button>
  );
}

export { PrimaryButton };
