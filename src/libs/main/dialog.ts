import { ipcMain, dialog } from 'electron';
import AppConfig from '../../config';

export type TriggerDialogType = {
  type: string;
  message: string;
};

export function triggerDialogBox(dialogParams: TriggerDialogType) {
  return dialog.showMessageBoxSync({
    type: dialogParams.type,
    message: dialogParams.message,
  });
}

export function initDialogBox() {
  ipcMain.handle(
    AppConfig.ipcChannels.triggerDialog,
    (_event: Electron.IpcMainInvokeEvent, dialogParams: TriggerDialogType) =>
      triggerDialogBox(dialogParams)
  );
}

export default function initDialogListener() {
  initDialogBox();
}
