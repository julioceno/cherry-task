import { Visibility, VisibilityOff } from '@mui/icons-material';
import { BaseTextFieldProps, IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { TextInput } from '../TextInput';

type TextFieldProps = Omit<BaseTextFieldProps, 'label' | 'name'>;

interface ITextFieldProps extends TextFieldProps {
  label: string;
  name: string;
}

function PasswordInput({
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
    <TextInput
      label={label}
      name={name}
      inputProps={{
        type: showPassword ? 'text' : 'password',
        endAdornment: (
          <InputAdornment position='start'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={toggle}
            >
              {showPassword ? (
                <Visibility color='primary' />
              ) : (
                <VisibilityOff color='primary' />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
}

export { PasswordInput };
