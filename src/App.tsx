import React, { Component } from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import rootReducer from './reducers';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

import ScannerContainer from './screens/Scanner';
import EditScanContainer from './screens/EditScan';
import DocumentListContainer from './screens/DocumentList';
const Stack = createStackNavigator();

export class App extends Component {
  /**
   * Main Screens:
   *   1. Scanner
   *   2. Edit Scan
   *   3. Document List (Tabs, Search)
   *   4. Document View
   *   5. Contact View
   *   6. Edit Document
   *   7. Account
   *   8. Mobile Pin Set
   *   9. Share Document
   */
  render() {
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
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
