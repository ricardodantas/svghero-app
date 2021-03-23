import {
  app,
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions,
} from 'electron';
import is from 'electron-is';
import translate from './localization/translate';
import AppConfig from './config';
import checkForUpdates, { canUpdate } from './actions/main/checkForUpdates';
import { canActivateLicense } from './libs/main/licenseActivation';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDarwinTemplate(): MenuItemConstructorOptions[] {
    const updateAndLicenseOptions: Menu = is.mas()
      ? [{ type: 'separator' }]
      : [
          { type: 'separator' },
          {
            label: `${translate('Check for Updates')}`,
            enabled: canUpdate(),
            click: (menuItem) => checkForUpdates(menuItem),
          },
          { type: 'separator' },
          {
            label: canActivateLicense()
              ? `${translate('activate_license')}`
              : `${translate('license')}`,
            enabled: true,
            click: () => {
              this.mainWindow.webContents.send(
                AppConfig.ipcChannels.reactRouterGoTo,
                AppConfig.routes.activateLicense
              );
            },
          },
        ];
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      label: app.getName(),
      submenu: [
        {
          label: `${translate('About')} ${app.getName()}`,
          selector: 'orderFrontStandardAboutPanel:',
        },
        { type: 'separator' },
        {
          label: `${translate('Preferences')}`,
          accelerator: 'Command+,',
          click: () => {
            this.mainWindow.webContents.send(
              AppConfig.ipcChannels.reactRouterGoTo,
              AppConfig.routes.preferences
            );
          },
        },
        ...updateAndLicenseOptions,
        // { label: 'Services', submenu: [] },
        {
          label: `${translate('Hide')} ${app.getName()}`,
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: translate('Hide Others'),
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        { label: translate('Show All'), selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: translate('Quit'),
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    };
    const subMenuEdit: DarwinMenuItemConstructorOptions = {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:',
        },
      ],
    };
    const subMenuViewDev: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: translate('Reload'),
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          },
        },
        {
          label: translate('Toggle Full Screen'),
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
        {
          label: translate('Toggle Developer Tools'),
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.webContents.toggleDevTools();
          },
        },
      ],
    };
    const subMenuViewProd: MenuItemConstructorOptions = {
      label: translate('View'),
      submenu: [
        {
          label: translate('Toggle Full Screen'),
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
      ],
    };
    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      label: translate('Window'),
      submenu: [
        {
          label: translate('Minimize'),
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        {
          label: translate('Close'),
          accelerator: 'Command+W',
          selector: 'performClose:',
        },
        { type: 'separator' },
        { label: 'Bring All to Front', selector: 'arrangeInFront:' },
      ],
    };
    const subMenuHelp: MenuItemConstructorOptions = {
      label: translate('Help'),
      submenu: [
        {
          label: translate('Report an issue'),
          click() {
            shell.openExternal(`${AppConfig.website}/report-issue`);
          },
        },
      ],
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
        ? subMenuViewDev
        : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: `&${translate('File')}`,
        submenu: [
          {
            label: `&${translate('Open')}`,
            accelerator: 'Ctrl+O',
          },
          {
            label: `&${translate('Close')}`,
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            },
          },
        ],
      },
      {
        label: `&${translate('View')}`,
        submenu:
          process.env.NODE_ENV === 'development' ||
          process.env.DEBUG_PROD === 'true'
            ? [
                {
                  label: `&${translate('Reload')}`,
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload();
                  },
                },
                {
                  label: translate('Toggle &Full Screen'),
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  },
                },
                {
                  label: translate('Toggle &Developer Tools'),
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.webContents.toggleDevTools();
                  },
                },
              ]
            : [
                {
                  label: translate('Toggle &Full Screen'),
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  },
                },
              ],
      },
      {
        label: translate('Help'),
        submenu: [
          {
            label: 'Report an issue',
            click() {
              shell.openExternal(`${AppConfig.website}/report/issue`);
            },
          },
        ],
      },
    ];

    return templateDefault;
  }
}
