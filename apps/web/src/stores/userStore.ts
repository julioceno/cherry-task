import { TRPCClient } from '@trpc/client';
import { action, makeAutoObservable, observable } from 'mobx';
import { useCookies } from 'react-cookie';
import { AppRouter } from '../../../api/src/routes';
import { config } from '../config';
import { User } from '../pages/SignIn/types';
import { snackbarStore, trpc } from '../utils';
import { appRouter } from '../../../api/src/routes';

class MyClass {
  myProperty: string;

  constructor() {
    this.myProperty = '';
  }

  // other methods...
}

class UserStore {
  private trpcClient: TRPCClient<AppRouter>;

  myData: any = null;

  constructor(trpcClient: TRPCClient<AppRouter>) {
    this.trpcClient = trpcClient;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  user: Nullable<User> = null;
  setUser(user: Nullable<User>) {
    this.user = user;
  }

  getTokens() {
    const [cookies] = useCookies([
      config.cookies.accessToken,
      config.cookies.refreshToken,
    ]);
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;

    return { accessToken, refreshToken };
  }

  #setTokens(accessToken: string, refreshToken: string) {
    const [, setCookies] = useCookies([
      config.cookies.accessToken,
      config.cookies.refreshToken,
    ]);

    setCookies(config.cookies.accessToken, accessToken);
    setCookies(config.cookies.refreshToken, refreshToken);
  }

  #removeTokens() {
    const [, , removeCookie] = useCookies([
      config.cookies.accessToken,
      config.cookies.refreshToken,
    ]);

    removeCookie(config.cookies.accessToken);
    removeCookie(config.cookies.refreshToken);
  }

  getAndValidateTokens() {
    const tokens = this.getTokens();

    /*   if (!tokens.refreshToken) {
      // fazer logout do usuario
      this.logout();
      return;
    }

    if (!tokens.accessToken) {
      return this.#refreshToken(tokens.refreshToken);
    } */

    this.#verifyToken(tokens.accessToken, tokens.refreshToken);
  }

  #verifyToken(accessToken: string, refreshToken: string) {
    // fazer a verificação de se o token é valido ou nao

    const response = trpc.verifyToken.useMutation();

    /* 
    if (!response.data?.valid) {
      return this.#refreshToken(refreshToken);
    }

    this.setUser(response.data.user); */
  }

  async #refreshToken(refreshToken: string) {
    const response = {
      ok: true,
      data: {
        accessToken: '',
        refreshToken: '',
      },
    }; // TODO: fazer refresh de token na api

    if (response.ok && response.data) {
      this.#setTokens(response.data.accessToken, response.data.refreshToken);

      await this.#verifyToken(
        response.data.accessToken,
        response.data.refreshToken
      );

      return this.getTokens();
    }

    this.#removeTokens();
    window.location.href = '/';
  }

  logout() {
    try {
      const tokens = this.getTokens();

      if (!tokens.refreshToken) {
        // verificar a necessidade de fazer uma rota na api para deslogar o usuario la mesmo
      }

      this.setUser(null);
      this.#removeTokens();
    } catch {
      snackbarStore.setMessage(
        'Ocorreu um erro ao tetnar sair, tente novamente.'
      );
    }
  }

  login(accessToken: string, refreshToken: string, redirectRoute?: string) {
    this.#setTokens(accessToken, refreshToken);
    window.location.href = redirectRoute || '/';
  }
}

const userStore = new UserStore(trpc);
export { userStore };
