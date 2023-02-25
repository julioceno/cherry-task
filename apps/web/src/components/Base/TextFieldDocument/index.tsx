import { useTheme } from '@mui/material';
import { CSSProperties } from 'react';

export interface TextFieldDocumentProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
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
  };

  const styles: CSSProperties = Object.assign(defaultStyles, receveidStyles);

  return <input id={name} name={name} type='text' style={styles} {...rest} />;
}

export { TextFieldDocument };
