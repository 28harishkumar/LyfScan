import { combineReducers } from 'redux';
import ScannerReducer from './scanner';

export default combineReducers({
  scanner: ScannerReducer,
});
