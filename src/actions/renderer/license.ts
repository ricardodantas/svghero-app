import { LicenseKeyAPiResponse, LICENSE_KEY } from '../../libs/license';
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

export function getLicenseKey() {
  const firstUseDate = getFirstUseDate();
  if (firstUseDate) {
    const start = DateTime.fromISO(firstUseDate);
    const end = DateTime.now();
    const { days: diffInDays } = end.diff(start, 'days').toObject();
    if (diffInDays <= AppConfig.trialPeriodDays) {
      return AppConfig.trialPeriodLicenseValue;
    }
  }
  return storeUserInfo.get(LICENSE_KEY);
}

export function setLicenseKey(licenseKey: string) {
  return storeUserInfo.set(LICENSE_KEY, licenseKey);
}

export async function isValidLicenseKey(
  email: string,
  licenseKey: string
): Promise<LicenseKeyAPiResponse | null> {
  try {
    if (!email.length) {
      throw new AppError('warning', 'Please fill your email address.');
    }

    if (!licenseKey.length) {
      throw new AppError('warning', 'Please fill your license key.');
    }

    const licenseResult = await fetch(`${AppConfig.apiUrl}/license`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, licenseKey }),
    }).then((response) => response.json());
    if (licenseResult?.enabled === true) {
      return licenseResult;
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
  return null;
}
