import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

type ISelectProps = Omit<SelectProps, 'label' | 'name' | 'onChange'>;

export interface SelectFieldProps extends ISelectProps {
  name: string;
  label: string;
  options: SelectOption[];
  onChange?: (e: SelectChangeEvent) => void;
}

export interface SelectOption {
  value: number | string;
  label: string;
}

function SelectField({
  name,
  label,
  variant = 'standard',
  fullWidth = true,
  options,
  ...rest
}: SelectFieldProps) {
  const theme = useTheme();
  const [value, setValue] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    rest.onChange?.(event as SelectChangeEvent);
    setValue(event.target.value);
  };

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel
        variant='standard'
        style={{ color: theme.palette.secondary.dark }}
      >
        {label}
      </InputLabel>
      <Select
        value={value}
        variant={variant}
        color='primary'
        name={name}
        {...rest}
        onChange={(e) => handleChange(e as SelectChangeEvent)}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export { SelectField };
