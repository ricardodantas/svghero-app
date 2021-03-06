/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AppConfig from '../config';
import { checkStoredLicense } from '../actions/renderer/license';

export default function ProtectedRoute({ component, ...rest }) {
  const Component = component;

  return (
    <Route
      {...rest}
      render={(props) => {
        return checkStoredLicense() ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: AppConfig.routes.activateLicense,
            }}
          />
        );
      }}
    />
  );
}
