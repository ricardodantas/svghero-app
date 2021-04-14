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

export enum LicenseEdition {
  COMMUNITY_EDITION = 'Community Edition',
  BETA_PROGRAM = 'Beta Program',
  PRO = 'PRO',
}

export type EditionType =
  | LicenseEdition.COMMUNITY_EDITION
  | LicenseEdition.BETA_PROGRAM
  | LicenseEdition.PRO;
