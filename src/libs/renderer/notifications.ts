import { ipcRenderer } from 'electron';
import { dirname } from 'path';
import translate from '../../localization/translate';
import AppConfig from '../../config';
import { NotificationOnClickAction } from '../notification';

// eslint-disable-next-line import/prefer-default-export
export function showSuccessNotification(selectedFiles: string[]) {
  const notificationTitle =
    selectedFiles.length > 1
      ? 'notification_title_files_optimized'
      : 'notification_title_file_optimized';
  const onClick =
    selectedFiles.length > 1
      ? {
          action: NotificationOnClickAction.openFolder,
          filePath: dirname(selectedFiles[0]),
        }
      : {
          action: NotificationOnClickAction.openFile,
          filePath: selectedFiles[0],
        };
  const notificationMessage =
    selectedFiles.length > 1
      ? `${selectedFiles.length} ${translate(
          'notification_message_files_optimized'
        )}`
      : selectedFiles[0];
  const notificationParams = {
    title: translate(notificationTitle),
    body: notificationMessage,
    onClick,
  };
  ipcRenderer.invoke(
    AppConfig.ipcChannels.triggerNotification,
    notificationParams
  );
}
