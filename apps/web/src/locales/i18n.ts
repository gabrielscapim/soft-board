import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import commonEn from './en/common.json'
import commonPtBr from './pt-BR/common.json'
import boardsRouteEn from './en/routes/boardsRoute.json'
import boardsRoutePtBr from './pt-BR/routes/boardsRoute.json'

i18n
  .use(initReactI18next)
  .init({
    lng: 'pt-BR',
    fallbackLng: 'en',
    nsSeparator: ':',
    saveMissing: true,
    returnNull: false,
    returnEmptyString: false,
    missingKeyHandler: (lngs, ns, key) => {
      console.warn(`Missing translation key: ${key} in namespace: ${ns} for languages: ${lngs.join(', ')}`)
    },
    interpolation: {
      escapeValue: false
    },
    resources: {
      'pt-BR': {
        common: commonPtBr,
        'routes.boards':  boardsRoutePtBr
      },
      en: {
        common: commonEn,
        'routes.boards': boardsRouteEn
      }
    },
    ns: [],
    defaultNS: 'common'
  })

export default i18n
