import { BaseTextFieldProps, TextField } from '@mui/material';

type TextFieldProps = Omit<BaseTextFieldProps, 'label' | 'name'>;

interface ITextFieldProps extends TextFieldProps {
  label: string;
  name: string;
}

function TextInput({
  variant = 'outlined',
  type = 'text',
  label,
  name,
  ...rest
}: ITextFieldProps) {
  return (
    <TextField placeholder={label} name={name} variant={variant} {...rest} />
  );
}

export { TextInput };
