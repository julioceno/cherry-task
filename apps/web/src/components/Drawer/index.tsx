import { Menu } from '@mui/icons-material';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Box, Tooltip, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuItemsPrivate } from '../../Routes/menuItems';
import { ConditionalTooltip } from '../ConditionalTooltip';

import { Drawer, DrawerHeader } from './styles';

function DrawerCustomer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const toggle = () => setOpen(!open);

  function handleClick(pathname: string) {
    navigate(pathname);
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
        <Tooltip
          title={open ? 'Retrair Menu' : 'Expandir Menu'}
          placement='right'
        >
          <IconButton onClick={toggle}>
            <Menu style={{ color: theme.palette.secondary.main }} />
          </IconButton>
        </Tooltip>
      </DrawerHeader>
      <Divider />
      <List style={{ flexGrow: 1 }}>
        {menuItemsPrivate.map((item) => (
          <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
            <ConditionalTooltip
              title={item.label}
              placement='right'
              enabled={!open}
            >
              <ListItemButton
                onClick={() => handleClick(item.pathname)}
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
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ConditionalTooltip>
          </ListItem>
        ))}
      </List>
      <Box style={{ whiteSpace: 'initial' }}>
        <Typography
          style={{
            textAlign: 'center',
            display: open ? 'block' : 'none',
          }}
        >
          A verdadeira organização começa dentro de você!
        </Typography>
      </Box>
    </Drawer>
  );
}

export { DrawerCustomer };
