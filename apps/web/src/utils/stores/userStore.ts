import { autorun, makeAutoObservable } from 'mobx';

class UserStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  username: Nullable<string> = null;

  setUsername(username: any) {
    this.username = username;
  }
}

const userStore = new UserStore();

autorun(() => {
  console.log('username: ', userStore.username);
});

export { userStore };
