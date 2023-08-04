import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { data } = useSelector((store) => store.auth);

  return (
    <Route
      {...rest}
      element={
        !data.isAuthenticated ? (
          <Navigate to="/" />
        ) : roles && !roles.includes(data.user.userType) ? (
          <Navigate to="*" />
        ) : (
          <Component />
        )
      }
    />
  );
};

export default PrivateRoute;
