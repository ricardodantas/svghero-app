import { PreferenceInputs } from '../../libs/preferences';
import { storePreferences } from '../../libs/store';

export function setPreference(preference: PreferenceInputs): void {
  storePreferences.set(preference.name, preference);
}

export function getPreference(
  preferenceKey: string,
  defaultValue: PreferenceInputs
): PreferenceInputs {
  return storePreferences.get(preferenceKey, defaultValue);
}
