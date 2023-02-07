import { Box } from '@mui/system';
import { Fragment, ReactNode } from 'react';
import { Item } from '../Routes/menuItems';
import { DrawerCustomer } from './Drawer';

interface AppWrapProps {
  children: ReactNode;
  label: string;
  publicRouter?: boolean;
  unlisted?: boolean;
}

function AppWrap({ children, label, publicRouter, unlisted }: AppWrapProps) {
  document.title = `Cherry Task - ${label}`;

  return publicRouter ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        alignItems: 'start',
      }}
    >
      <DrawerCustomer />
      <Box component='main' sx={{ flexGrow: 1, paddingLeft: 3 }}>
        {children}
      </Box>
    </Box>
  );
}

export { AppWrap };
