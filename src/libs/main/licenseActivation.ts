import { LICENSE_KEY } from '../license';
import { storeUserInfo } from '../store';

export function canActivateLicense() {
  const licenseValue = storeUserInfo.get(LICENSE_KEY);
  return !licenseValue || !licenseValue.length;
}

export function activateLicense(license: string) {
  if (canActivateLicense()) {
    storeUserInfo.set(LICENSE_KEY, license);
  }
}
