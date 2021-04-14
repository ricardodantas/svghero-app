export enum NotificationOnClickAction {
  openFile,
  openFolder,
}

export type OnClickParams = {
  action: NotificationOnClickAction;
  filePath?: string;
  folderPath?: string;
};

export type TriggerNotificationType = {
  title: string;
  body: string;
  subtitle?: string;
  onClick?: OnClickParams;
};
