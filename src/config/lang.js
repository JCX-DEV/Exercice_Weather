import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import commonEN from '../translations/en/commonEN.json';
import commonFR from '../translations/fr/commonFR.json';
import moment from 'moment';
import 'moment/locale/fr';

const supportedLocales = [
    {id: 'en', label: 'English'},
    {id: 'fr', label: 'Français'}
];

i18next.on('languageChanged', function(lng) {
  moment.locale(lng);
});

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['navigator']
    },
    load: 'languageOnly',
    preload: supportedLocales.map(lng => lng.id),
    supportedLngs: supportedLocales.map(lng => lng.id),
    debug: true,
    resources: {
      en: {
        common: commonEN
      },
      fr: {
        common: commonFR
      }  
    },
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    keySeparator: '.'  
  }, function(err, t) {}
);

export const lang = {
    
  supportedLocales(){
    return supportedLocales;
  },
  

  current(){
    return i18next.language.substring(0, 2);
  },

  changeLang(lng, callback){
    i18next.changeLanguage(lng).then(
      () => callback(lng)
    );
  },

  t(key, opt){
    return ((key && (key !== "")) ? i18next.t(key, opt) : "");
  }
};