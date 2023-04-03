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

function AvatarCustomer({ username }: { username: string }) {
  const firstLetter = username[0];
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen((prev) => !prev);
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
                  <MenuItem onClick={() => undefined}>Sair</MenuItem>
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
