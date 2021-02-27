const config = Object.freeze({
  website: 'https://svghero.app',
  credits: 'Ricardo Dantas Gonçalves',
  authors: ['Ricardo Dantas Gonçalves'],
  routes: {
    home: '/',
    preferences: '/preferences',
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
