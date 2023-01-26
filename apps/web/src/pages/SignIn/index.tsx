import { Grid, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import {
  PasswordInput,
  PrimaryButton,
  Spacer,
  TextInput,
} from '../../components';
import { useStyles } from './styles';

function SignIn() {
  const classes = useStyles();

  const theme = useTheme();

  return (
    <Grid container flexDirection='row' className={classes.container}>
      <Grid
        container
        item
        flexDirection='column'
        justifyContent='center'
        className={classes.sideBar}
        spacing={20}
        lg={5}
        xs={12}
      >
        <Grid
          container
          item
          flexDirection='column'
          textAlign='center'
          spacing={2.5}
        >
          <Grid item>
            <Typography variant='h3' fontWeight={600}>
              Venha, e crie sua conta!
            </Typography>
          </Grid>
          <Grid container item justifyContent='center' xs>
            <Box width='35%'>
              <Typography className={classes.subtitle}>
                Crie sua conta e comece a organizar suas cerejas junto conosco
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container item justifyContent='center'>
          <Grid item xs={5} md={3}>
            <PrimaryButton title='Inscreva-se' href='/sign-up' fullWidth />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        item
        flexDirection='column'
        justifyContent='center'
        lg={7}
        xs={12}
      >
        <Box padding={theme.spacing(0, 10)}>
          <Grid item>
            <Typography variant='h4' textAlign='center' fontWeight={600}>
              Entrar
            </Typography>
          </Grid>
          <Grid item>
            <Spacer y={10} />
          </Grid>
          <Grid container item justifyContent='center' spacing={4}>
            <Grid item md={8} xs={12}>
              <TextInput label='Usuário' name='usuario' fullWidth />
            </Grid>
            <Grid item md={8} xs={12}>
              <Grid item xs={12}>
                <PasswordInput
                  label='Senha'
                  name='senha'
                  type='password'
                  fullWidth
                />
              </Grid>

              <Spacer y={3} />
              <Grid item xs={12} textAlign='end'>
                <Typography
                  component='a'
                  fontSize={15}
                  fontWeight={100}
                  style={{ opacity: 0.9, cursor: 'pointer' }}
                  onClick={() => alert('Ainda nao implementado')}
                >
                  Esqueceu a senha?
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Spacer y={10} />
          </Grid>
          <Grid container item justifyContent='center'>
            <Grid item xs={12} md={3}>
              <PrimaryButton
                title='Entrar'
                variant='contained'
                color='blackButton'
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export { SignIn };

/**
 * import { useState } from 'react';
import { trpc } from '../../utils/trpc';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function SignIn() {
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassoword] = useState('');

  const navigate = useNavigate();

  const authenticate = trpc.authenticate.useMutation();

  function clearFields() {
    setEmail('');
    setPassoword('');
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <div>
        <Button variant='contained'>Hello World</Button>
        <h1 style={{ textAlign: 'center' }}>Entrar</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            authenticate.mutate(
              {
                email,
                password,
              },
              {
                onSuccess(value) {
                  console.log(value);
                  localStorage.setItem('token', value.data.token);

                  navigate('/Dashboard');
                  clearFields();
                },
                onError(value) {
                  setError(value.message);
                },
              }
            );
          }} //julio@gmail.com
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Senha'
              value={password}
              onChange={(e) => setPassoword(e.target.value)}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button>Entrar</button>
          </div>
          {authenticate.isLoading && <p>Carregando...</p>}
          {error && <p>{error}</p>}

          <a href='/sign-up'>Registrar-se</a>
        </form>
      </div>
    </div>
  );
}

export { SignIn };

 */
