import AppError from '../libs/errors';

const electron = window.require('electron');
const { remote } = electron;
const { dialog } = remote;

export default function onError(error: AppError) {
  return dialog.showMessageBoxSync({
    type: error.type,
    message: error.message,
  });
}
