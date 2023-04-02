import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { Spacer } from '../../../components';

function StatusChange({ hasChange }: { hasChange: Nullable<boolean> }) {
  if (hasChange) {
    return (
      <React.Fragment>
        <CircularProgress size={20} color='blackButton' />
        <Spacer x={1} />
        <Typography fontStyle='italic'>Salvando alterações</Typography>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <CloudDoneIcon />
      <Spacer x={1} />
      <Typography fontStyle='italic'>
        Documento Sem alterações pendentes
      </Typography>
    </React.Fragment>
  );
}

export { StatusChange };
