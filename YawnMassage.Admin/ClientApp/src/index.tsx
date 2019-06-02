import './assets/scss/sidebar.css';
import './assets/scss/theme-overrides.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@progress/kendo-theme-bootstrap/dist/all.css';
import './assets/scss/custom.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
//import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { routeService } from './routes/route.service';
import { localise, contextService, applicationService, accountSessionService } from './modules/shared/services';
import { uiDomService } from './modules/shared/services/ui-dom.service';

//Because we use KendoUI controls in the system.
require("@progress/kendo-ui/js/kendo.datetimepicker.js");
require("@progress/kendo-ui/js/kendo.upload.js");

const rootElement = document.getElementById('root') as HTMLElement;

//Set default culture based on browser.
contextService.setCurrentCulture(window.navigator.language.toUpperCase())

//Check user login session, and set user culture (if available).
let isAuthenticated = accountSessionService.isAuthenticated();
if (isAuthenticated) {
  let user = accountSessionService.getAuthenticatedUser();
  user && user.culture && contextService.setCurrentCulture(user.culture);
}

//Load everything else after loading application UI data.
applicationService.initializeApplicationData(isAuthenticated)
  .then(() => {

    window.document.title = localise("TEXT_PRODUCT_NAME");
    routeService.initializeRoutes();

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      rootElement
    );

  }, () => {
    rootElement.innerHTML = "Application failed to load.";
  });


window.onresize = uiDomService.adjustDynamicPageContentSizes;

//registerServiceWorker();
