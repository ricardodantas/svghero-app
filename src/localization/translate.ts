const loadedLanguage: { [x: string]: string } = require(`./en.json`);
type ParamsProptype = {
  [x: string]: string | number;
};

export default function i18n(phrase: string, params?: ParamsProptype) {
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
