import ClearIcon from '@mui/icons-material/Clear';
import { Checkbox, IconButton, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { KeyboardEvent, useState } from 'react';
import { TextFieldDocument } from '../TextFieldDocument';

interface Props {
  checked: boolean;
  label: string;
}

function CheckboxDocument({ label }: Props) {
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  const [checked, setChecked] = useState(false);

  const toggleHover = () => {
    setHover(!hover);
  };

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  const handleOnKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key === 'Enter');
  };

  return (
    <div onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Checkbox
          checked={checked}
          onClick={toggleCheckbox}
          sx={{ color: grey[700] }}
        />
        <TextFieldDocument
          label=''
          name={label}
          styles={{
            fontSize: theme.spacing(4),
            ...(checked && { color: grey[400] }),
          }}
          onKeyUp={handleOnKeyUp}
        />

        {hover && (
          <IconButton>
            <ClearIcon color='error' />
          </IconButton>
        )}
      </Box>
    </div>
  );
}

export { CheckboxDocument };
