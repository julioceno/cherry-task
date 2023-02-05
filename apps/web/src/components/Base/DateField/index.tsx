import React from 'react';
import { TextField, TextFieldProps, useTheme } from '@mui/material';
import {
  DesktopDatePicker,
  DesktopDatePickerProps,
} from '@mui/x-date-pickers/DesktopDatePicker';
import { useState } from 'react';
import { FormikInputProps } from '../../formik';

export interface DateFieldProps
  extends Omit<TextFieldProps, 'name' | 'label'>,
    FormikInputProps {
  handleChange?: (value: any) => void; // TODO: tipar corretamente
}

function DateField({ label, fullWidth = true, ...rest }: DateFieldProps) {
  const [value, setValue] = useState<Nullable<string>>(null);
  const theme = useTheme();

  const handleChange = (value: Nullable<Date>) => {
    console.log(value);
    rest.handleChange?.(value);
    /*     setValue(value ? value.toISOString() : null); */
  };

  return (
    <DesktopDatePicker
      label={label}
      value={value}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          variant='standard'
          fullWidth={fullWidth}
          InputLabelProps={{
            style: {
              color: theme.palette.secondary.dark,
            },
          }}
          {...rest}
          {...params}
          name={rest.name}
        />
      )}
    />
  );
}

export { DateField };
