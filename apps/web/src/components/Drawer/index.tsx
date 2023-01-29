import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Menu } from '@mui/icons-material';
import { Typography, Tooltip } from '@mui/material';

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  background: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: theme.spacing(10),
  background: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(12),
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  background: theme.palette.primary.dark,
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

function DrawerCustomer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }

  return (
    <Drawer variant='permanent' open={open}>
      <DrawerHeader>
        <Typography
          variant='h5'
          style={{
            fontWeight: 'bolder',
            width: '100%',
            textAlign: 'center',
            display: open ? 'block' : 'none',
          }}
        >
          Cherry Task
        </Typography>
        <IconButton onClick={toggle}>
          <Tooltip title='Abrir menu'>
            <Menu style={{ color: theme.palette.secondary.main }} />
          </Tooltip>
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List style={{ flexGrow: 1 }}>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: theme.palette.secondary.main,
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Typography
        style={{ textAlign: 'center', display: open ? 'block' : 'none' }}
      >
        A verdaudera organização começa dentro de você!
      </Typography>
    </Drawer>
  );
}

export { DrawerCustomer };
