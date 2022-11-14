import React from 'react';
import {
  // Redirect,
  Route,
  RouteProps,
} from 'react-router-dom';

export interface PriveRouteProps {}

export function PrivateRoute(props: RouteProps): JSX.Element {
  // const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  // if (!isLoggedIn) return <Redirect to="/login" />;
  return <Route {...props} />;
}
