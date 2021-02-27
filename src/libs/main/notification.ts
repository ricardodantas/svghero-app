/* eslint-disable default-case */
import { ipcMain, shell } from 'electron';
import AppConfig from '../../config';
import {
  OnClickParams,
  NotificationOnClickAction,
  TriggerNotificationType,
} from '../notification';

const { Notification } = require('electron');

async function onClickHandler(onClickParams?: OnClickParams) {
  if (onClickParams) {
    switch (onClickParams.action) {
      case NotificationOnClickAction.openFile:
        if (onClickParams.filePath)
          shell.showItemInFolder(onClickParams.filePath);
        break;
      case NotificationOnClickAction.openFolder:
        if (onClickParams.filePath)
          await shell.openPath(onClickParams.filePath);
        break;
    }
  }
}

export function triggerNotification({
  title,
  body,
  subtitle,
  onClick,
}: TriggerNotificationType): void {
  if (Notification.isSupported()) {
    const notification = new Notification({
      title,
      body,
      subtitle,
    });
    notification.show();
    notification.on('click', () => onClickHandler(onClick));
  }
}

export default function initNotificationListener() {
  ipcMain.handle(
    AppConfig.ipcChannels.triggerNotification,
    (
      _event: Electron.IpcMainInvokeEvent,
      notification: TriggerNotificationType
    ) => triggerNotification(notification)
  );
}
