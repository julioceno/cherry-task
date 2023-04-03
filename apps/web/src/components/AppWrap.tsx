import { Box } from '@mui/system';
import { Fragment, ReactNode, useRef, useState } from 'react';
import { Item } from '../Routes/menuItems';
import { DrawerCustomer } from './Drawer';
import {
  AppBar,
  Avatar,
  Button,
  ClickAwayListener,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Typography,
} from '@mui/material';
import { useIsMobile } from '../hooks/useIsMobile';
import { AvatarCustomer } from './AvatarCustomer';

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
      <AppBar
        position='absolute'
        color='transparent'
        style={{ boxShadow: 'none' }}
      >
        <Toolbar disableGutters>
          <Box width='100%' px={10}>
            <Grid container justifyContent='flex-end' alignItems='center'>
              <Grid item>
                <Typography>
                  <strong>julio.nepomuceno</strong>
                </Typography>
              </Grid>
              <Grid item>
                <AvatarCustomer username='julio.nepomuceno' />
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
      <DrawerCustomer />
      <Box component='main' sx={{ flexGrow: 1, paddingLeft: 3 }}>
        {children}
      </Box>
    </Box>
  );
}

export { AppWrap };
