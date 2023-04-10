import { makeAutoObservable } from 'mobx';
import { User } from '../../pages/SignIn/types';

class UserStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  user: Nullable<User> = null;
  setUser(user: Nullable<User>) {
    this.user = user;
  }
}

const userStore = new UserStore();
export { userStore };
