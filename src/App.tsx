import React, { Component } from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

import ScannerContainer from './screens/Scanner';
import EditScanContainer from './screens/EditScan';
import DocumentListContainer from './screens/DocumentList';
import DocumentViewContainer from './screens/DocumentView';
import ContactViewContainer from './screens/ContactView';
import EditDocumentContainer from './screens/EditDocument';
import AccountContainer from './screens/Account';
import SetMobilePinContainer from './screens/SetMobilePin';
import ShareDocumentContainer from './screens/ShareDocument';
import AuthenticationContainer from './screens/Authentication';


const Stack = createStackNavigator();

export class App extends Component {
  /**
   * TODO:
   *   1. Check authentication
   *   2. Set user preferences
   */
  render() {
    // TODO: Authentication will be first screen
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='Scanner'
              component={ScannerContainer} />

            <Stack.Screen
              name='EditScan'
              component={EditScanContainer}
            />

            <Stack.Screen
              name='DocumentList'
              component={DocumentListContainer}
            />

            <Stack.Screen
              name='DocumentView'
              component={DocumentViewContainer}
            />

            <Stack.Screen
              name='ContactView'
              component={ContactViewContainer}
            />

            <Stack.Screen
              name='EditDocument'
              component={EditDocumentContainer}
            />

            <Stack.Screen
              name='Account'
              component={AccountContainer}
            />

            <Stack.Screen
              name='SetMobilePin'
              component={SetMobilePinContainer}
            />

            <Stack.Screen
              name='ShareDocument'
              component={ShareDocumentContainer}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
