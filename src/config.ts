const config = Object.freeze({
  appName: 'SvgHero',
  website: 'https://svghero.app',
  version: '0.2.1',
  credits: 'Ricardo Dantas Gonçalves',
  authors: ['Ricardo Dantas Gonçalves'],
  routes: {
    home: '/',
    preferences: '/preferences',
  },
  ipcChannels: {
    reactRouterGoTo: 'REACT_ROUTER_GO_TO',
    preferencesSet: 'PREFERENCES_SET',
    preferencesGet: 'PREFERENCES_GET',
  },
});

export default config;
