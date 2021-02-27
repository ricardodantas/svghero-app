import { ipcMain, dialog } from 'electron';
import AppConfig from '../../config';

export type TriggerDialogType = {
  type: string;
  message: string;
};

export function triggerDialog(dialogParams: TriggerDialogType) {
  return dialog.showMessageBoxSync({
    type: dialogParams.type,
    message: dialogParams.message,
  });
}
export default function initDialogListener() {
  ipcMain.handle(
    AppConfig.ipcChannels.triggerDialog,
    (_event: Electron.IpcMainInvokeEvent, dialogParams: TriggerDialogType) =>
      triggerDialog(dialogParams)
  );
}
