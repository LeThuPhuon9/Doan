import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { ROUTES } from 'constant';

function ProtectedAdminRoute({ component: Component, ...rest }) {
  const userData = useSelector((state) => state.userInfo);
  const isAdmin = userData.isAuth && userData.username === 'lethuphuong2962003a5ca0';

  return (
    <Route
      {...rest}
      render={props =>
        isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to={ROUTES.HOME} />
        )
      }
    />
  );
}

export default ProtectedAdminRoute;