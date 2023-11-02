/* eslint-disable react/jsx-filename-extension */
import {observer} from 'mobx-react';
import {Link, useHistory, withRouter} from 'react-router-dom';

import Cookies from 'js-cookie';

import './index.css';

const Header = observer(() => {
  const history = useHistory();
  const onClickLogout = (): void => {
    Cookies.remove('jwt_token');
    // const {history} = props
    history.replace('/login');
  };

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <ul className="nav-menu">
          <li>
            <Link to="/">
              <img
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </Link>
          </li>

          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
});
export default withRouter(Header);
