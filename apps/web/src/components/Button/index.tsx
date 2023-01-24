import { Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';
import { useStyles } from './styles';

interface IPrimaryButtonProps extends ButtonProps {
  title: string;
  icon?: ReactNode;
}

function PrimaryButton({ title, icon, ...rest }: IPrimaryButtonProps) {
  const classes = useStyles();

  return (
    <Button
      variant='outlined'
      color='secondary'
      className={classes.root}
      style={{ borderRadius: 30 }}
      {...rest}
    >
      {icon || title}
    </Button>
  );
}

export { PrimaryButton };
