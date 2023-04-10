import { TextareaAutosize, useTheme } from '@mui/material';
import { CSSProperties } from 'react';
import { TextareaAutosizeProps } from 'react-textarea-autosize';

/* export interface TextFieldDocumentProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  label?: string;
  styles?: CSSProperties;
} */

export interface TextFieldDocumentProps extends TextareaAutosizeProps {
  name: string;
  label?: string;
  styles?: CSSProperties;
}

function TextFieldDocument({
  name,
  styles: receveidStyles,
  ...rest
}: TextFieldDocumentProps) {
  const theme = useTheme();

  const defaultStyles: CSSProperties = {
    border: '0 none',
    background: 'none',
    boxShadow: 'none',
    outline: 'none',
    width: '100%',
    padding: 0,
    margin: 0,
    color: theme.palette.secondary.dark,
    resize: 'none',
    fontFamily: 'sans-serif',
  };

  const styles: CSSProperties = Object.assign(defaultStyles, receveidStyles);

  return (
    <TextareaAutosize
      id={name}
      name={name}
      style={styles}
      cacheMeasurements={false}
      {...rest}
    />
  );
}

export { TextFieldDocument };
