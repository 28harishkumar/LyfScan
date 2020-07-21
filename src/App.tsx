import React, { Component } from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MenuProvider } from 'react-native-popup-menu';

import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger),
);

import ScannerContainer from './screens/Scanner';
import EditScanContainer from './screens/EditScan';
import DocumentListContainer from './screens/DocumentList';
import EditDocumentContainer from './screens/EditDocument';
import AccountContainer from './screens/Account';
import SetMobilePinContainer from './screens/SetMobilePin';
import ShareDocumentContainer from './screens/ShareDocument';
import AuthenticationContainer from './screens/Authentication';
import { IntiDirectory } from './storage/folderStorage';

const Stack = createStackNavigator();

export class App extends Component {
  componentDidMount() {
    IntiDirectory();
  }

  /**
   * TODO:
   *   1. Check authentication
   *   2. Set user preferences
   */
  render() {
    // TODO: Authentication will be first screen

    const customStyles = {
      backdrop: {
        backgroundColor: '#000',
        opacity: 0.6,
      },
    };

    return (
      <MenuProvider customStyles={customStyles}>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator headerMode='none'>
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
      </MenuProvider>
    );
  }
}
