import { CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
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
import { CreateUserInput } from './types';
import { CreateUserSchema } from './validation';

const initialValues: CreateUserInput = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

function SignUp() {
  const classes = useStyles();
  const theme = useTheme();

  const authenticate = trpc.createUser.useMutation();
  const [, setCookie] = useCookies(['token']);

  function handleSubmit(values: CreateUserInput) {
    const { username, email, password, passwordConfirm } = values;

    const formattedData = {
      username,
      email,
      password,
      passwordConfirm,
    };

    authenticate.mutate(formattedData, {
      onSuccess(value) {
        setCookie('token', value.token);
      },
      onError(value) {
        snackbarStore.setMessage(value.message);
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
        spacing={10}
        lg={7}
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
              Seja bem-vindo de volta
            </Typography>
          </Grid>
          <Grid container item justifyContent='center' xs>
            <Box width='35%'>
              <Typography className={classes.subtitle}>
                Para organziar suas cerejas, faça login com seus dados pessoais
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container item justifyContent='center'>
          <Grid item xs={5} md={3}>
            <PrimaryButton href='/' fullWidth>
              Entrar
            </PrimaryButton>
          </Grid>
        </Grid>
      </Grid>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={toFormikValidationSchema(CreateUserSchema)}
      >
        {({ handleSubmit }) => (
          <Grid
            container
            item
            flexDirection='column'
            justifyContent='center'
            lg={5}
            xs={12}
          >
            <Form onSubmit={handleSubmit}>
              <Box padding={theme.spacing(0, 10)}>
                <Grid item>
                  <Typography variant='h4' textAlign='center' fontWeight={600}>
                    Criar conta
                  </Typography>
                </Grid>
                <Grid item>
                  <Spacer y={10} />
                </Grid>
                <Grid container item justifyContent='center' spacing={4}>
                  <Grid item md={8} xs={12}>
                    <TextInput label='Usuário' name='username' fullWidth />
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextInput label='Email' name='email' fullWidth />
                  </Grid>

                  <Grid container item spacing={8} md={8} xs={12}>
                    <Grid item xs>
                      <PasswordInput
                        label='Senha'
                        name='password'
                        type='password'
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs>
                      <PasswordInput
                        label='Confirmar Senha'
                        name='passwordConfirm'
                        type='password'
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Spacer y={10} />
                </Grid>
                <Grid container item justifyContent='center'>
                  <Grid item xs={12} md={3}>
                    <PrimaryButton
                      variant='contained'
                      color='blackButton'
                      type='submit'
                      disabled={authenticate.isLoading}
                      fullWidth
                    >
                      {authenticate.isLoading ? (
                        <CircularProgress size={25} color='blackButton' />
                      ) : (
                        'Inscreva-se'
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

export { SignUp };
