import ClearIcon from '@mui/icons-material/Clear';
import { Checkbox, IconButton, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import {
  KeyboardEvent,
  useState,
  ChangeEventHandler,
  ChangeEvent,
} from 'react';
import { TextFieldDocument } from '../TextFieldDocument';

interface Task {
  id: string;
  label: string;
  checked: boolean;
  focus: boolean;
}

interface Props {
  task: Task;
  createStep: () => void;
  deleteStep: () => void;
  toggleCheckbox: () => void;
  handleOnChange: (value: string) => void;
}

function CheckboxDocument({
  createStep,
  deleteStep,
  toggleCheckbox,
  task,
  handleOnChange: handleOnChangeCustomize,
}: Props) {
  const theme = useTheme();
  const [hover, setHover] = useState(false);

  const toggleHover = () => {
    setHover(!hover);
  };

  const handleOnKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createStep();
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleOnChangeCustomize(value);
  };

  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <div
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {hover && (
          <IconButton
            style={{
              position: 'absolute',
              marginRight: '4rem',
            }}
            size='small'
            onClick={deleteStep}
          >
            <ClearIcon color='error' />
          </IconButton>
        )}
        <Checkbox
          checked={task.checked}
          onClick={toggleCheckbox}
          sx={{ color: grey[700] }}
        />
      </div>
      <TextFieldDocument
        name={'aaaa'}
        value={task.label}
        styles={{
          fontSize: theme.spacing(4),
          ...(task.checked && { color: grey[400] }),
        }}
        onKeyUp={handleOnKeyUp}
        onChange={handleOnChange}
        ref={(input) => {
          console.log(input);
          input && input.focus();
        }}
      />
    </Box>
  );
}

export { CheckboxDocument };
