import { PreferenceTypeSection } from './preferences';

const Store = require('electron-store');

export const storePreferences = new Store({
  name: PreferenceTypeSection.SVGO_PLUGINS,
});

export const storeUserInfo = new Store({
  name: PreferenceTypeSection.USER_INFO,
});
