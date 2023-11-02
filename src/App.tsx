import {FC} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Home from './Components/Home/index.tsx';
import JobDetails from './Components/JobDetails/index.tsx';
import Jobs from './Components/Jobs/index.tsx';
import Login from './Components/Login/index.tsx';
import NotFound from './Components/NotFound/index.tsx';
import ProtectedRoute from './Components/ProtectedRoute/index.tsx';

import './App.css';

const App: FC = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
);

export default App;
