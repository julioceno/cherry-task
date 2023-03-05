import ClearIcon from '@mui/icons-material/Clear';
import { Checkbox, IconButton, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { KeysEnum } from '../../../enums';
import { ITask } from '../../../pages/Task/types';
import { TextFieldDocument } from '../TextFieldDocument';

interface Props {
  task: ITask;
  createStep: () => void;
  deleteStep: () => void;
  toggleCheckbox: () => void;
  handleOnChange: (value: string) => void;
  handleOnKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
}

function CheckboxDocument({
  createStep,
  deleteStep,
  toggleCheckbox,
  task,
  handleOnChange: handleOnChangeCustomize,
  handleOnKeyUp: handleOnKeyUpCustomize,
}: Props) {
  const theme = useTheme();
  const [hover, setHover] = useState(false);

  const toggleHover = () => {
    setHover(!hover);
  };

  const handleOnKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KeysEnum.ENTER) {
      createStep();
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleOnChangeCustomize(value);
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      key={task.id}
      component='div'
    >
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
        id={task.id}
        name={`task-input-${task.id}`}
        value={task.label || ''}
        styles={{
          fontSize: theme.spacing(4),
          ...(task.checked && { color: grey[400] }),
        }}
        onKeyUp={handleOnKeyUpCustomize}
        onChange={handleOnChange}
        ref={(input) => {
          input && input.focus();
        }}
      />
    </Box>
  );
}

export { CheckboxDocument };
