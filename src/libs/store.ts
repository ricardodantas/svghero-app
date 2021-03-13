import { PreferenceTypeSection } from './preferences';

const Store = require('electron-store');

export const AVAILABLE_STORE_KEYS = {
  [PreferenceTypeSection.EXPORT_PREFERENCES]: {
    SELECTED_FORMATS: 'selectedFormats',
  },
};

export const storePreferences = new Store({
  name: PreferenceTypeSection.SVGO_PLUGINS,
});

export const defaultExportPreferences = {
  [AVAILABLE_STORE_KEYS[PreferenceTypeSection.EXPORT_PREFERENCES]
    .SELECTED_FORMATS]: [],
};

export const storeExportPreferences = new Store({
  name: PreferenceTypeSection.EXPORT_PREFERENCES,
});

export const storeUserInfo = new Store({
  name: PreferenceTypeSection.USER_INFO,
});

if (process.env.NODE_ENV === 'development') {
  storeExportPreferences.openInEditor();
  storeUserInfo.openInEditor();
  storePreferences.openInEditor();
}
