import is from 'electron-is';
import { LicenseEdition, LICENSE_KEY } from '../../libs/license';
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

export function getRemainingTrialPeriod() {
  const firstUseDate = getFirstUseDate();
  const end = DateTime.fromISO(firstUseDate).plus({
    days: AppConfig.trialPeriodDays,
  });
  const start = DateTime.now();
  const { days: diffInDays } = end.diff(start, 'days').toObject();
  return diffInDays.toFixed(0);
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

export function setLicenseKey(licenseKey: string) {
  return storeUserInfo.set(LICENSE_KEY, licenseKey);
}

export function checkStoredLicense() {
  if (is.mas()) {
    return true;
  }

  const license = getLicenseKey();

  if (!license || AppConfig.trialPeriodLicenseValue === license) {
    setLicenseKey(AppConfig.communityEditionLicense);
    return true;
  }

  if (AppConfig.communityEditionLicense === license) {
    return true;
  }

  if (license !== null && license.length >= 30) {
    return true;
  }

  return false;
}

export async function isValidLicenseKey(licenseKey: string): Promise<boolean> {
  try {
    if (navigator.onLine !== true) {
      return true;
    }

    if (!licenseKey || !licenseKey.length) {
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

export function setFirstUseDate() {
  if (!getFirstUseDate()) {
    const firstUseDate = DateTime.now().toISO();
    storeUserInfo.set(FIRST_USE_DATE_KEY, firstUseDate);
    setLicenseKey(AppConfig.communityEditionLicense);
  }
}

export async function verifyLicense() {
  const storedLicense = await getLicenseKey();

  if (storedLicense === AppConfig.communityEditionLicense) {
    return;
  }

  if (navigator.onLine === true) {
    if (checkStoredLicense()) {
      return;
    }

    if (!storedLicense) {
      throw new AppError('error', 'Sorry, no license key found.');
    }

    const isValid = await isValidLicenseKey(storedLicense);
    if (!isValid) {
      throw new AppError('error', 'Your license key is invalid or expired.');
    }
  }
}

export async function getLicenseEditionType() {
  const storedLicense = await getLicenseKey();
  if (storedLicense && storedLicense.length > 40) {
    return LicenseEdition.BETA_PROGRAM;
  }

  if (storedLicense && (await isValidLicenseKey(storedLicense))) {
    return LicenseEdition.PRO;
  }

  return LicenseEdition.COMMUNITY_EDITION;
}
