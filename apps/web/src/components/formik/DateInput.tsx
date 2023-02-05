import { FormHelperText } from '@mui/material';
import { useField } from 'formik';
import { Fragment } from 'react';
import { DateField, DateFieldProps } from '../Base';

function DateInput({ name, onChange, ...rest }: DateFieldProps) {
  const [field, meta, helpers] = useField(name);

  const handleChange = (value: any) => {
    rest.handleChange?.(value);
    helpers.setValue(value.target.value);
  };

  return (
    <Fragment>
      <DateField {...field} {...rest} onChange={handleChange} />
      {meta.error && meta.touched && (
        <FormHelperText error>{meta.error}</FormHelperText>
      )}
    </Fragment>
  );
}

export { DateInput };
