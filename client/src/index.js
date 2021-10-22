import './index.css';

import { ApiConnection } from './api/ApiConnection';
import { App } from './containers/App';
import { IpcHandler } from './ipc/IpcHandler';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { ScrollMemory } from './containers/ScrollMemory';
import { config } from './config';
import { configureStore } from './configureStore';
import { createSafeBrowserHistory } from './createSafeBrowserHistory';

// import registerServiceWorker from './registerServiceWorker'; // TODO

console.log(React.version);
const api = new ApiConnection();
const ipc = new IpcHandler();
const store = configureStore(api, ipc);
api.initialize(config.TABLE_API_URL, store.dispatch, store.getState);
ipc.initialize(store.dispatch);

const safeBrowserHistory = createSafeBrowserHistory();

ReactDOM.render(
    <Router history={safeBrowserHistory.browserHistory}>
        <ScrollMemory>
            <Provider store={store}>
                <App />
            </Provider>
        </ScrollMemory>
    </Router>
, document.getElementById('root'));


// registerServiceWorker();
