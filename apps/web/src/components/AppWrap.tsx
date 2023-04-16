import { AppBar } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { Fragment, ReactNode } from 'react';
import { DrawerCustomer } from './Drawer';
import { Header } from './Header';

interface AppWrapProps {
  children: ReactNode;
  label: string;
  publicRouter?: boolean;
  unlisted?: boolean;
}

const AppWrap = ({ children, label, publicRouter, unlisted }: AppWrapProps) => {
  document.title = `Cherry Task - ${label}`;

  return publicRouter ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Box
      style={{
        display: 'flex',
        height: '100%',
        alignItems: 'start',
      }}
    >
      <Header />
      <DrawerCustomer />
      <Box component='main' sx={{ flexGrow: 1, paddingLeft: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export { AppWrap };
