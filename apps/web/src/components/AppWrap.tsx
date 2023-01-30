import { Box } from '@mui/system';
import { Fragment, ReactNode } from 'react';
import { DrawerCustomer } from './Drawer';

interface AppWrapProps {
  children: ReactNode;
  label: string;
  publicRouter?: boolean;
}

function AppWrap({ children, label, publicRouter }: AppWrapProps) {
  document.title = `Cherry Task - ${label}`;

  return publicRouter ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <DrawerCustomer />
      <Box component='main' sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
}

export { AppWrap };
