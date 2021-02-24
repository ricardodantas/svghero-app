import translate from './translate';

const electron = window.require('electron');
const { remote } = electron;
const { Notification } = remote;

// eslint-disable-next-line import/prefer-default-export
export function showSuccessNotification(selectedFiles: string[]) {
  const notificationTitle =
    selectedFiles.length > 1
      ? 'notification_title_files_optimized'
      : 'notification_title_file_optimized';
  const notificationMessage =
    selectedFiles.length > 1
      ? `${selectedFiles.length} ${translate(
          'notification_message_files_optimized'
        )}`
      : selectedFiles[0];
  new Notification({
    title: translate(notificationTitle),
    body: notificationMessage,
  }).show();
}
