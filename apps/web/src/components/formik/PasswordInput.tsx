import { FormHelperText, TextFieldProps } from '@mui/material';
import { useField } from 'formik';
import { Fragment } from 'react';
import { PasswordField } from '../Base';

interface ITextFieldProps extends Omit<TextFieldProps, 'label' | 'name'> {
  label: string;
  name: string;
}

function PasswordInput({ ...rest }: ITextFieldProps) {
  const [field, meta] = useField({ name: rest.name });

  return (
    <Fragment>
      <PasswordField {...field} {...rest} />
      {meta.error && meta.touched && (
        <FormHelperText error>{meta.error}</FormHelperText>
      )}
    </Fragment>
  );
}

export { PasswordInput };
