import {observer} from 'mobx-react';
import './index.css';

const NotFound = () => (
  <div className="bg-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt=" not found "
    />
    <h1>Page Not Found</h1>
    <p>We are sorry, the page you requested could not be found</p>
  </div>
);

export default observer(NotFound);
