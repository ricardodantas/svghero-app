import { storeUserInfo } from '../../libs/store';

const FIRST_USE_DATE_KEY = 'firstUseDate';

export function getLicenseKey() {
  const firstUseDate = storeUserInfo.get(FIRST_USE_DATE_KEY);
  if (firstUseDate || !NaN(Date.parse(firstUseDate))) {
    return firstUseDate;
  }
  return false;
}

export function setFirstUseDate() {
  if (!getLicenseKey()) {
    const firstUseDate = new Date().toISOString();
    storeUserInfo.set(FIRST_USE_DATE_KEY, firstUseDate);
  }
}
