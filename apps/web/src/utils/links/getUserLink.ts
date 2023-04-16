import { TRPCLink } from '@trpc/client';
import { AppRouter } from '../../../../api/src/routes';
import { config } from '../../config';
import { User } from '../../pages/SignIn/types';
import { AxiosTrpcResponse, axiosIntance } from '../axios';
import { snackbarStore, userStore } from '../stores';

function handleGetUser() {
  return axiosIntance.get<AxiosTrpcResponse<User>>('privateRouter.getUser');
}

export const getUserLink: TRPCLink<AppRouter> = () => {
  return ({ next, op }) => {
    const user = userStore.user;
    const accessToken = localStorage.getItem(config.tokens.accessToken);

    if (!user && accessToken) {
      handleGetUser()
        .then((response) => {
          const user = response.data.result.data;
          userStore.setUser(user);
        })
        .catch(() => {
          snackbarStore.setMessage('Houve um erro ao obter o seu usuário.');
        });
    }

    if (user && !accessToken) {
      userStore.resetUser();
    }

    return next(op);
  };
};
