import { FormHelperText } from '@mui/material';
import { useField } from 'formik';
import { Fragment } from 'react';
import { TextFieldDocument, TextFieldDocumentProps } from '../Base';

function TextFieldDocumentInput({ ...rest }: TextFieldDocumentProps) {
  const [field, meta] = useField({ name: rest.name });

  return (
    <Fragment>
      <TextFieldDocument {...field} {...rest} />
      {meta.error && meta.touched && (
        <FormHelperText error>{meta.error}</FormHelperText>
      )}
    </Fragment>
  );
}

export { TextFieldDocumentInput };
