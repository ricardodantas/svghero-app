/* eslint-disable import/prefer-default-export */
export const LICENSE_KEY = 'licenseKey';

export type LicenseKeyAPiResponse = {
  enabled: boolean;
  product_link: string;
  license_key: string;
  buyer_email: string;
  uses: number;
  date: string;
};
