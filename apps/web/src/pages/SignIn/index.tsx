import { CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import {
  PasswordInput,
  PrimaryButton,
  Spacer,
  TextInput,
} from '../../components';
import { snackbarStore } from '../../utils';
import { trpc } from '../../utils/trpc';
import { useStyles } from './styles';
import { ILoginForm } from './types';
import { LoginSchema } from './validation';

function SignIn() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const authenticate = trpc.authenticate.useMutation();

  function handleSubmit(values: ILoginForm) {
    setLoading(true);

    const formattedData = {
      email: values.user,
      password: values.password,
    };

    authenticate.mutate(formattedData, {
      onSuccess(value) {
        setLoading(false);
      },
      onError(value) {
        setLoading(false);
        snackbarStore.setMessage(
          'Não foi possível autenticar, verifique se suas credenciais estão corretas'
        );
      },
    });
  }

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
            <PrimaryButton href='/sign-up' fullWidth>
              Inscreva-se
            </PrimaryButton>
          </Grid>
        </Grid>
      </Grid>
      <Formik
        initialValues={{ user: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={toFormikValidationSchema(LoginSchema)}
      >
        {({ values, handleSubmit }) => (
          <Grid
            container
            item
            flexDirection='column'
            justifyContent='center'
            lg={7}
            xs={12}
          >
            <Form onSubmit={handleSubmit}>
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
                    <TextInput label='Usuário' name='user' fullWidth />
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <Grid item xs={12}>
                      <PasswordInput
                        label='Senha'
                        name='password'
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
                      title=''
                      variant='contained'
                      color='blackButton'
                      type='submit'
                      disabled={loading}
                      fullWidth
                    >
                      {loading ? (
                        <CircularProgress size={25} color='blackButton' />
                      ) : (
                        'Entrar'
                      )}
                    </PrimaryButton>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          </Grid>
        )}
      </Formik>
    </Grid>
  );
}

export { SignIn };