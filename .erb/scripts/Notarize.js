const { notarize } = require('electron-notarize');
const { build } = require('../../package.json');

exports.default = async function notarizeMacos(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  // if (!process.env.CI) {
  //   console.warn('Skipping notarizing step. Packaging is not running in CI');
  //   return;
  // }
  if (process.env.DISTRIBUTION === 'mas') {
    console.warn('Skipping notarizing step. MAS distribution.');
    return;
  }

  if (!('APPLE_ID' in process.env && 'APPLE_ID_PASS' in process.env)) {
    console.warn('Skipping notarizing step. APPLE_ID and APPLE_ID_PASS env variables must be set');
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  const appPath = `${appOutDir}/${appName}.app`;

  console.log(
    `Notarizing ${build.appId} (${appName}) found at ${appPath}`
  );

  await notarize({
    ascProvider: process.env.ASC_PROVIDER,
    appBundleId: build.appId,
    appPath,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASS,
  });
};
