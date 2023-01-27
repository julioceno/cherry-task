import { TextField, TextFieldProps, useTheme } from '@mui/material';
import { useStyles } from './styles';

interface ITextFieldProps extends Omit<TextFieldProps, 'label' | 'name'> {
  label: string;
  name: string;
}

function CustomTextField({
  variant = 'standard',
  type = 'text',
  label,
  name,
  ...rest
}: ITextFieldProps) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <TextField
      placeholder={label}
      label={label}
      name={name}
      InputLabelProps={{
        style: {
          color: theme.palette.secondary.dark,
        },
      }}
      variant={variant}
      className={classes.root}
      {...rest}
    />
  );
}

export { CustomTextField };
