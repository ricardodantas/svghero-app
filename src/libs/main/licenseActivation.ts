import { storeUserInfo } from '../store';

const LICENSE_KEY = 'licenseKey';

export function canActivateLicense() {
  const licenseValue = storeUserInfo.get(LICENSE_KEY);
  return !licenseValue || !licenseValue.length;
}

export function activateLicense(license: string) {
  if (canActivateLicense()) {
    storeUserInfo.set(LICENSE_KEY, license);
  }
}
