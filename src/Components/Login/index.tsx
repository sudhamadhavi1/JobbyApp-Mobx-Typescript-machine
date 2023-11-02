import Cookies from 'js-cookie';
import {observer} from 'mobx-react';
import React, {FormEvent} from 'react';

import {Redirect, useHistory} from 'react-router-dom';
import loginStore from '../../store/LoginStore.tsx';
import './index.css';

const Login = observer(() => {
  console.log('Login');
  const {username, password, showSubmitError, errorMsg} = loginStore;

  const history = useHistory();
  const onChangeUsername = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    loginStore.setUsername(event.target.value);
  };

  const onChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    loginStore.setPassword(event.target.value);
  };

  const onSubmitSuccess = (jwtToken: string) => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    });
    history.replace('/');
  };

  const onSubmitFailure = (errorMsgExecuted: string) => {
    loginStore.setShowSubmitError(true);
    loginStore.setErrorMsg(errorMsgExecuted);
  };
  const renderPasswordField = (): JSX.Element => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="password-input-field"
        value={password}
        onChange={onChangePassword}
        placeholder="Password"
      />
    </>
  );

  const submitForm = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const userDetails = {username, password};
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };
  const renderUsernameField = (): JSX.Element => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="username-input-field"
        value={username}
        onChange={onChangeUsername}
        placeholder="Username"
      />
    </>
  );
  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken !== undefined) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-form-container">
      <form className="form-container" onSubmit={submitForm}>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="image"
          />
        </div>
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  );
});

export default Login;
