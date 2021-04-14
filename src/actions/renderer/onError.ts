import { ipcRenderer } from 'electron';
import AppError from '../../libs/errors';
import AppConfig from '../../config';
// const electron = window.require('electron');
// const { remote } = electron;
// const { dialog } = remote;

export default function onError(error: AppError) {
  const errorParams = {
    type: error.type,
    message: error.message,
  };
  ipcRenderer.invoke(AppConfig.ipcChannels.triggerDialog, errorParams);
}
