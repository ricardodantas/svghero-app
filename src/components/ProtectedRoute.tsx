/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AppConfig from '../config';
import { getLicenseKey } from '../actions/renderer/license';

export default function ProtectedRoute({ component, ...rest }) {
  const Component = component;
  const licenseKey = getLicenseKey();
  const isValidLicenseKey = licenseKey !== null && licenseKey.length >= 30;
  return (
    <Route
      {...rest}
      render={(props) => {
        return isValidLicenseKey ? (
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
