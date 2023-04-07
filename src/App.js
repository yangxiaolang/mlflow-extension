import { ReactWidget } from '@jupyterlab/apputils';
import './index.css';
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import './index.css';
import '@databricks/design-system/dist/index.css';
import App from './experiment-tracking/components/App';
import { Provider } from 'react-redux';
import { I18nUtils } from './i18n/I18nUtils';
import { DesignSystemContainer } from './common/components/DesignSystemContainer';

import { applyMiddleware, compose, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import { rootReducer } from './experiment-tracking/reducers/Reducers';

export function MLFlowRoot() {
  const { locale, messages } = I18nUtils.getIntlProviderParams();

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(thunk, promiseMiddleware()))
  );

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Provider store={store}>
        <DesignSystemContainer>
          <App />
        </DesignSystemContainer>
      </Provider>
    </IntlProvider>
  );
}

// const Counter = () => {
//   const [num, setNum] = useState(0);
//   return <button onClick={() => setNum(num + 5)}>{num}</button>;
// };

// import './App.css';
export default ReactWidget.create(<MLFlowRoot></MLFlowRoot>);
