import React from 'react';
import ReactDOM from 'react-dom';
import  {Provider}  from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ThemeProvider } from 'styled-components'
import LoadingSpinner from './components/elements/LoadingSpinner';
import {store, persistor} from './redux/configureStore';
import './index.css';
import App from './App';
import theme from './theme'
import * as serviceWorker from './serviceWorker';
import Wrapper from './components/blocks/Wrapper';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

ReactDOM.render(
    <Provider store={store}>
        <Wrapper />
        <ThemeProvider theme={theme}>
            <PersistGate loading={<LoadingSpinner/>} persistor={persistor}>
                <ReactNotification />
                    <App/>
            </PersistGate>
        </ThemeProvider>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
