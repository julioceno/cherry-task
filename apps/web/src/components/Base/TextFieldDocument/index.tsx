import { useTheme } from '@mui/material';

interface Styles {
  fontSize: string;
  bold?: boolean;
}

interface TextFieldDocumentProps {
  name: string;
  label: string;
  styles: Styles;
}

function TextFieldDocument({ name, label, styles }: TextFieldDocumentProps) {
  const theme = useTheme();

  const defaultStyles = {
    border: '0 none',
    background: 'none',
    boxShadow: 'none',
    outline: 'none',
    color: theme.palette.secondary.dark,
    width: '100%',
    padding: 0,
    margin: 0,

    fontSize: styles.fontSize,
    fontWeight: styles.bold ? 'bold' : 'none',
  };

  return (
    <input
      id={name}
      type='text'
      name={name}
      placeholder={label}
      style={defaultStyles}
    />
  );
}

export { TextFieldDocument };
