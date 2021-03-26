import { ipcRenderer } from 'electron';
import { dirname } from 'path';
import translate from '../../localization/translate';
import AppConfig from '../../config';
import { NotificationOnClickAction } from '../notification';

export function showSuccessExportNotification({
  selectedFormatsForExport,
  optimizedFilePaths,
}: {
  selectedFormatsForExport: string[];
  optimizedFilePaths: string[];
}) {
  if (!optimizedFilePaths || !selectedFormatsForExport) {
    return;
  }

  const totalFilesExported =
    optimizedFilePaths.length * selectedFormatsForExport.length;

  const onClick =
    optimizedFilePaths.length > 1
      ? {
          action: NotificationOnClickAction.openFolder,
          filePath: dirname(optimizedFilePaths[0]),
        }
      : {
          action: NotificationOnClickAction.openFile,
          filePath: optimizedFilePaths[0],
        };

  const notificationTitle =
    optimizedFilePaths.length > 1
      ? `${optimizedFilePaths.length} ${translate(
          'notification_title_files_exported'
        )}`
      : translate('notification_title_file_exported');

  const notificationMessage =
    totalFilesExported > 1
      ? translate('notification_message_files_exported')
      : translate('notification_message_file_exported');

  const notificationParams = {
    onClick,
    title: notificationTitle,
    body: `${notificationMessage} ${selectedFormatsForExport
      .map((item: string) => item.toUpperCase())
      .join(', ')}`,
  };
  ipcRenderer.invoke(
    AppConfig.ipcChannels.triggerNotification,
    notificationParams
  );
}

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
