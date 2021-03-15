import { LICENSE_KEY } from '../../libs/license';
import { storeUserInfo } from '../../libs/store';
import AppConfig from '../../config';
import onError from './onError';
import AppError from '../../libs/errors';

const { DateTime } = require('luxon');

const FIRST_USE_DATE_KEY = 'firstUseDate';

export function getFirstUseDate() {
  const firstUseDate = storeUserInfo.get(FIRST_USE_DATE_KEY);
  if (firstUseDate && DateTime.fromISO(firstUseDate)) {
    return firstUseDate;
  }
  return false;
}

export function setFirstUseDate() {
  if (!getFirstUseDate()) {
    const firstUseDate = DateTime.now().toISO();
    storeUserInfo.set(FIRST_USE_DATE_KEY, firstUseDate);
  }
}

export function getLicenseKey(): string | null {
  const firstUseDate = getFirstUseDate();
  if (firstUseDate) {
    const start = DateTime.fromISO(firstUseDate);
    const end = DateTime.now();
    const { days: diffInDays } = end.diff(start, 'days').toObject();

    if (diffInDays <= AppConfig.trialPeriodDays) {
      return AppConfig.trialPeriodLicenseValue;
    }
  }
  return storeUserInfo.get(LICENSE_KEY, null);
}

export function checkStoredLicense() {
  const license = getLicenseKey();
  if (AppConfig.trialPeriodLicenseValue === license) {
    return true;
  }
  if (license !== null && license.length >= 30) {
    return true;
  }

  return false;
}

export function setLicenseKey(licenseKey: string) {
  return storeUserInfo.set(LICENSE_KEY, licenseKey);
}

export async function isValidLicenseKey(licenseKey: string): Promise<boolean> {
  try {
    if (navigator.onLine !== true) {
      return false;
    }
    if (!licenseKey.length) {
      throw new AppError('warning', 'Please fill your license key.');
    }

    const licenseResult = await fetch(
      `${AppConfig.apiUrl}/license?licenseKey=${licenseKey}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => response.json());

    if (licenseResult?.enabled === true) {
      return true;
    }
  } catch (error) {
    let handledError = {
      ...error,
      message: error.message,
      type: 'error',
    };
    if (error instanceof AppError) {
      handledError = { ...error, message: error.message };
    }

    onError(handledError);
  }
  return false;
}

export async function verifyLicense() {
  if (navigator.onLine === true) {
    const storedLicense = await getLicenseKey();
    if (!storedLicense) {
      throw new AppError('error', 'Sorry, no license key found.');
    }
    const isValid = await isValidLicenseKey(storedLicense);
    if (!isValid) {
      throw new AppError('error', 'Your license key is invalid or expired.');
    }
  }
}
