const config = Object.freeze({
  website: 'https://svghero.app',
  credits: 'Ricardo Dantas Gonçalves',
  authors: ['Ricardo Dantas Gonçalves'],
  apiUrl: 'https://svghero.app/api',
  trialPeriodDays: 7,
  trialPeriodLicenseValue: 'TRIAL_PERIOD',
  routes: {
    home: '/',
    preferences: '/preferences',
    activateLicense: '/activateLicense',
  },
  ipcChannels: {
    triggerDialog: 'TRIGGER_DIALOG',
    triggerNotification: 'TRIGGER_NOTIFICATION',
    reactRouterGoTo: 'REACT_ROUTER_GO_TO',
    preferencesSet: 'PREFERENCES_SET',
    preferencesGet: 'PREFERENCES_GET',
  },
});

export default config;
