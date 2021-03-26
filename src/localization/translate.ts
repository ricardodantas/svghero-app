// const path = require('path');
// const electron = require('electron');
// const fs = require('fs');

// const app = electron.app ? electron.app : electron.remote.app;

const loadedLanguage: { [x: string]: string } = require(`./en.json`);
type ParamsProptype = {
  [x: string]: string | number;
};

export default function i18n(phrase: string, params?: ParamsProptype) {
  // if (fs.existsSync(`./${app.getLocale()}.json`)) {
  //   loadedLanguage = JSON.parse(fs.readFileSync());
  // }

  let translation = loadedLanguage[phrase];
  if (translation === undefined) {
    translation = phrase;
  }
  if (params !== undefined) {
    Object.keys(params).forEach((key) => {
      translation = translation.replace(`{${key}}`, params[key] as string);
    });
  }
  return translation;
}
