import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import commonEn from './en/common.json'
import commonPtBr from './pt-BR/common.json'
import boardsRouteEn from './en/routes/boardsRoute.json'
import boardsRoutePtBr from './pt-BR/routes/boardsRoute.json'
import boardsWizardRouteEn from './en/routes/boardWizardRoute.json'
import boardsWizardRoutePtBr from './pt-BR/routes/boardWizardRoute.json'
import editBoardRouteEn from './en/routes/editBoardRoute.json'
import editBoardRoutePtBr from './pt-BR/routes/editBoardRoute.json'

i18n
  .use(initReactI18next)
  .init({
    lng: 'pt-BR',
    fallbackLng: 'pt-BR',
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
        'routes.boards':  boardsRoutePtBr,
        'routes.boardWizard': boardsWizardRoutePtBr,
        'routes.editBoard': editBoardRoutePtBr
      },
      en: {
        common: commonEn,
        'routes.boards': boardsRouteEn,
        'routes.boardWizard': boardsWizardRouteEn,
        'routes.editBoard': editBoardRouteEn
      }
    },
    ns: [],
    defaultNS: 'common'
  })

export default i18n
