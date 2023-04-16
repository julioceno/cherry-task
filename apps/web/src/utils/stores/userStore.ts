import { autorun, makeAutoObservable } from 'mobx';
import { User } from '../../pages/SignIn/types';

class UserStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  user: Nullable<User> = null;
  setUser(user: User) {
    this.user = user;
  }

  resetUser() {
    this.user = null;
  }
}

const userStore = new UserStore();

export { userStore };
