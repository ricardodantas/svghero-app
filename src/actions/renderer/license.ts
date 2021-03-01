import { LICENSE_KEY } from '../../libs/license';
import { storeUserInfo } from '../../libs/store';
import AppConfig from '../../config';

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
