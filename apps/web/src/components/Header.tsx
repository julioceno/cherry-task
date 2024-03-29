import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { AvatarCustomer } from './AvatarCustomer';
import { userStore } from '../utils/stores/userStore';
import { observer } from 'mobx-react-lite';

const Header = observer(() => {
  const username = userStore.user?.username ?? '';

  return (
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
                <strong>{username}</strong>
              </Typography>
            </Grid>
            <Grid item>
              <AvatarCustomer username={username} />
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export { Header };
