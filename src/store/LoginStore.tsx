import {action, makeObservable, observable} from 'mobx';

class LoginStore {
  username: string = '';

  password: string = '';

  errorMsg: string = '';

  showSubmitError: boolean = false;

  constructor() {
    makeObservable(this, {
      username: observable,
      password: observable,
      errorMsg: observable,
      showSubmitError: observable,
      setUsername: action,
      setPassword: action,
      setShowSubmitError: action,
      setErrorMsg: action,
    });
  }

  setUsername(username: string) {
    this.username = username;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setShowSubmitError(showSubmitError: boolean) {
    this.showSubmitError = showSubmitError;
  }

  setErrorMsg(errorMsg: string) {
    this.errorMsg = errorMsg;
  }
}
const loginStore = new LoginStore();

export default loginStore;
