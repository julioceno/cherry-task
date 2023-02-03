import { FormHelperText } from '@mui/material';
import { useField } from 'formik';
import { Fragment } from 'react';
import { SelectField, SelectFieldProps } from '../Base/SelectField';

function SelectInput({ ...rest }: SelectFieldProps) {
  const [field, meta] = useField({ name: rest.name });

  return (
    <Fragment>
      <SelectField {...field} {...rest} />
      {meta.error && meta.touched && (
        <FormHelperText error>{meta.error}</FormHelperText>
      )}
    </Fragment>
  );
}

export { SelectInput };
