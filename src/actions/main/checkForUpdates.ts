import translate from '../../localization/translate';

const { autoUpdater } = require('electron-updater');
const fs = require('fs');
// const log = require('electron-log');
const { dialog } = require('electron');

let updater: Electron.MenuItem | null = null;
let isSilentCheck = true;
// autoUpdater.autoDownload = false;

autoUpdater.on('error', (error: { stack: Error }) => {
  dialog.showErrorBox(
    'Error: ',
    !!error === null ? 'unknown' : (error.stack || error).toString()
  );
});

autoUpdater.on('update-not-available', () => {
  if (!isSilentCheck) {
    dialog.showMessageBox({
      title: translate('No Updates'),
      message: translate('Current version is up-to-date.'),
    });
  }
  if (updater) {
    updater.enabled = true;
    updater = null;
  }
});

// autoUpdater.on('update-downloaded', () => {
//   dialog.showMessageBox(
//     {
//       title: translate('Install Updates'),
//       message: translate(
//         'Updates downloaded, application will now exit to update.'
//       ),
//     },
//     () => {
//       setImmediate(() => autoUpdater.quitAndInstall());
//     }
//   );
// });

export const canUpdate = () => {
  // Don't check for updates if update config is not found (auto-update via electron is not supported)
  return (
    autoUpdater.app &&
    autoUpdater.app.appUpdateConfigPath &&
    fs.existsSync(autoUpdater.app.appUpdateConfigPath)
  );
};

export default function checkForUpdates(menuItem: Electron.MenuItem) {
  if (!canUpdate()) {
    return;
  }

  if (menuItem) {
    updater = menuItem;
    updater.enabled = false;
  }
  isSilentCheck = false;
  autoUpdater.checkForUpdates();
}
