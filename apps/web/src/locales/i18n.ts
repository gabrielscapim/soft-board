import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import commonEn from './en/common/common.json'
import commonPtBr from './pt-BR/common/common.json'
import componentsEn from './en/components/components.json'
import componentsPtBr from './pt-BR/components/components.json'
import boardsRouteEn from './en/routes/boardsRoute.json'
import boardsRoutePtBr from './pt-BR/routes/boardsRoute.json'
import boardsWizardRouteEn from './en/routes/boardWizardRoute.json'
import boardsWizardRoutePtBr from './pt-BR/routes/boardWizardRoute.json'
import editBoardRouteEn from './en/routes/editBoardRoute.json'
import editBoardRoutePtBr from './pt-BR/routes/editBoardRoute.json'
import forgotPasswordRouteEn from './en/routes/forgotPasswordRoute.json'
import forgotPasswordRoutePtBr from './pt-BR/routes/forgotPasswordRoute.json'
import membersRouteEn from './en/routes/membersRoute.json'
import membersRoutePtBr from './pt-BR/routes/membersRoute.json'
import resetPasswordRouteEn from './en/routes/resetPasswordRoute.json'
import resetPasswordRoutePtBr from './pt-BR/routes/resetPasswordRoute.json'
import settingsRouteEn from './en/routes/settingsRoute.json'
import settingsRoutePtBr from './pt-BR/routes/settingsRoute.json'
import sharedBoardRouteEn from './en/routes/sharedBoardRoute.json'
import sharedBoardRoutePtBr from './pt-BR/routes/sharedBoardRoute.json'
import signInRouteEn from './en/routes/signInRoute.json'
import signInRoutePtBr from './pt-BR/routes/signInRoute.json'
import signUpRouteEn from './en/routes/signUpRoute.json'
import signUpRoutePtBr from './pt-BR/routes/signUpRoute.json'
import boardWizardLayoutEn from './en/layouts/boardWizardLayout.json'
import boardWizardLayoutPtBr from './pt-BR/layouts/boardWizardLayout.json'
import editBoardLayoutEn from './en/layouts/editBoardLayout.json'
import editBoardLayoutPtBr from './pt-BR/layouts/editBoardLayout.json'
import rootLayoutEn from './en/layouts/rootLayout.json'
import rootLayoutPtBr from './pt-BR/layouts/rootLayout.json'
import softComponentsEn from './en/softComponents/softComponents.json'
import softComponentsPtBr from './pt-BR/softComponents/softComponents.json'
import tutorialEn from './en/tutorial/tutorial.json'
import tutorialPtBr from './pt-BR/tutorial/tutorial.json'
import { NODE_ENV } from '@/constants'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt-BR',
    nsSeparator: ':',
    saveMissing: true,
    returnNull: false,
    returnEmptyString: false,
    missingKeyHandler: (lngs, ns, key) => {
      if (NODE_ENV === 'development') {
        throw new Error(`Missing translation key: ${key} in namespace: ${ns} for languages: ${lngs.join(', ')}`)
      }
    },
    interpolation: {
      escapeValue: false
    },
    resources: {
      'pt-BR': {
        common: commonPtBr,
        components: componentsPtBr,
        'routes.boards':  boardsRoutePtBr,
        'routes.boardWizard': boardsWizardRoutePtBr,
        'routes.editBoard': editBoardRoutePtBr,
        'routes.forgotPassword': forgotPasswordRoutePtBr,
        'routes.members': membersRoutePtBr,
        'routes.resetPassword': resetPasswordRoutePtBr,
        'routes.settings': settingsRoutePtBr,
        'routes.sharedBoard': sharedBoardRoutePtBr,
        'routes.signIn': signInRoutePtBr,
        'routes.signUp': signUpRoutePtBr,
        'layouts.boardWizard': boardWizardLayoutPtBr,
        'layouts.editBoardLayout': editBoardLayoutPtBr,
        'layouts.rootLayout': rootLayoutPtBr,
        'soft-components': softComponentsPtBr,
        tutorial: tutorialPtBr
      },
      en: {
        common: commonEn,
        components: componentsEn,
        'routes.boards': boardsRouteEn,
        'routes.boardWizard': boardsWizardRouteEn,
        'routes.editBoard': editBoardRouteEn,
        'routes.forgotPassword': forgotPasswordRouteEn,
        'routes.members': membersRouteEn,
        'routes.resetPassword': resetPasswordRouteEn,
        'routes.settings': settingsRouteEn,
        'routes.sharedBoard': sharedBoardRouteEn,
        'routes.signIn': signInRouteEn,
        'routes.signUp': signUpRouteEn,
        'layouts.boardWizard': boardWizardLayoutEn,
        'layouts.editBoardLayout': editBoardLayoutEn,
        'layouts.rootLayout': rootLayoutEn,
        'soft-components': softComponentsEn,
        tutorial: tutorialEn
      }
    },
    ns: [],
    defaultNS: 'common'
  })

export default i18n
