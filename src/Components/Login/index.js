import {useMachine} from '@xstate/react';
import Cookies from 'js-cookie';
import {useState} from 'react';
import {Redirect} from 'react-router-dom';

import loginMachine from '../../Machines/loginMachine';

import './index.css';

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [state, send] = useMachine(loginMachine);

  const onChangeUserName = event => {
    setUserName(event.target.value);
  };
  const onChangePassword = event => {
    setPassword(event.target.value);
  };

  const submitForm = event => {
    event.preventDefault();
    send('onFormSubmitEvent', {username, password});
  };

  const renderPasswordField = () => (
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

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="username-input-field"
        value={username}
        onChange={onChangeUserName}
        placeholder="Username"
      />
    </>
  );

  const jwtToken = Cookies.get('jwt_token');
  // Once the user has logged in, if he wants to come to login page - it is redirectd to home page.
  if (jwtToken !== undefined) {
    return <Redirect to="/" />;
  }

  const isButtonLoading = state.hasTag('submitButtonLoading');

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
          {isButtonLoading ? 'loading' : 'Login'}
        </button>
        {state.context.error && (
          <p className="error-message">*{state.context.error}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
