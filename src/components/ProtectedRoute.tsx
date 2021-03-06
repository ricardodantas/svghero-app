/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AppConfig from '../config';
import { getLicenseKey } from '../actions/renderer/license';

export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return getLicenseKey() !== null ? (
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
