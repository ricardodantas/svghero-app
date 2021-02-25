const config = Object.freeze({
  appName: 'SvgHero',
  website: 'https://svghero.app',
  version: '0.1.0',
  credits: 'Ricardo Dantas Gonçalves',
  authors: ['Ricardo Dantas Gonçalves'],
  routes: {
    preferences: '/preferences',
  },
  ipcChannels: {
    reactRouterGoTo: 'REACT_ROUTER_GO_TO',
  },
});

export default config;
