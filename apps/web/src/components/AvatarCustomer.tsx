import {
  Avatar,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import { useRef, useState } from 'react';
import { config } from '../config';
import { snackbarStore, trpc } from '../utils';

function AvatarCustomer({ username }: { username: string }) {
  const firstLetter = username[0];
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const logout = trpc.logout.useMutation();

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  function handleLogout() {
    const refreshToken = localStorage.getItem(config.tokens.refreshToken);

    if (!refreshToken) {
      snackbarStore.setMessage('Houve um problema ao tentar sair.');
      return;
    }

    function logoutActions() {
      localStorage.removeItem(config.tokens.accessToken);
      localStorage.removeItem(config.tokens.refreshToken);
      window.location.href = '/';
    }

    logout.mutate(
      { refreshToken },
      {
        onSuccess() {
          logoutActions();
        },
        onError() {
          snackbarStore.setMessage(
            'Houve um problema ao sair, estamos te redirecionando para a tela de login.'
          );

          setTimeout(() => {
            logoutActions();
          }, 500);
        },
      }
    );

    localStorage.removeItem(config.tokens.accessToken);
    localStorage.removeItem(config.tokens.refreshToken);
  }

  return (
    <>
      <Button
        aria-controls='menu-list-grow'
        aria-haspopup='true'
        ref={anchorRef}
        onClick={toggleOpen}
      >
        <Avatar>{firstLetter}</Avatar>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={toggleOpen}>
                <MenuList autoFocusItem={open}>
                  <MenuItem onClick={handleLogout}>Sair</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export { AvatarCustomer };
