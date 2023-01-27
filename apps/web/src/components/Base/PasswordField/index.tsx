import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextFieldProps } from '@mui/material';
import { useState } from 'react';
import { CustomTextField } from '../TextField';

interface ITextFieldProps extends Omit<TextFieldProps, 'label' | 'name'> {
  label: string;
  name: string;
}

function PasswordField({
  label,
  name,
  type = 'password',
  ...rest
}: ITextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggle = () => {
    setShowPassword((value) => !value);
  };

  return (
    <CustomTextField
      label={label}
      name={name}
      InputProps={{
        type: showPassword ? 'text' : 'password',
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={toggle}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
}
export { PasswordField };
