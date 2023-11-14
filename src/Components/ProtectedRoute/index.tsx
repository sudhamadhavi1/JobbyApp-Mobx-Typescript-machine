import Cookie from 'js-cookie';
import {observer} from 'mobx-react';
import {Redirect, Route, RouteProps} from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {}

const ProtectedRoute: React.FC<ProtectedRouteProps> = observer(({...rest}) => {
  const token = Cookie.get('jwt_token');
  if (token === undefined) {
    return <Redirect to="/login" />;
  }
  return <Route {...rest} />;
});

export default ProtectedRoute;
