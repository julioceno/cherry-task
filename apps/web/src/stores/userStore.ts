import { makeAutoObservable } from 'mobx';
import { useCookies } from 'react-cookie';
import { config } from '../config';
import { User } from '../pages/SignIn/types';
import { snackbarStore, trpc } from '../utils';

class UserStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  user: Nullable<User> = null;
  setUser(user: Nullable<User>) {
    this.user = user;
  }

  getTokens() {}

  setTokens(accessToken: string, refreshToken: string) {
    console.log(accessToken, refreshToken);
    /*   const [, setCookies] = useCookies([
      config.cookies.accessToken,
      config.cookies.refreshToken,
    ]);

    setCookies(config.cookies.accessToken, accessToken);
    setCookies(config.cookies.refreshToken, refreshToken); */
  }

  removeTokens() {}

  getAndValidateTokens() {}

  #verifyToken(accessToken: string, refreshToken: string) {}

  async #refreshToken(refreshToken: string) {}

  logout() {}

  login(accessToken: string, refreshToken: string, redirectRoute?: string) {}
}

const userStore = new UserStore();
export { userStore };
