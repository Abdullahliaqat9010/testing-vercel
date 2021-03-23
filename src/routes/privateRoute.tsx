import React, { useEffect } from 'react';
import { Route, RouteProps } from 'react-router'

export interface IPrivateRouteProps extends RouteProps {
  isAuth: boolean // is authenticate route
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({isAuth, ...props}) => {
  useEffect(() => {
    if (!isAuth) {
      window.location.href = '/login';
    }
  }, [isAuth]);

  return <Route {...props} component={props.component} />
};

export default PrivateRoute