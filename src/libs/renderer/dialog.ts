import { ipcRenderer } from 'electron';
import AppConfig from '../../config';
// const electron = window.require('electron');
// const { remote } = electron;
// const { dialog } = remote;

export default function triggerDialog(type: string, message: string) {
  const params = {
    type,
    message,
  };
  ipcRenderer.invoke(AppConfig.ipcChannels.triggerDialog, params);
}
