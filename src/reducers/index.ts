import { combineReducers } from 'redux';
import ScannerReducer from './scanner';
import EditScanReducer from './editScan';
import DocumentListReducer from './documentList';

export default combineReducers({
  scanner: ScannerReducer,
  editScan: EditScanReducer,
  documentList: DocumentListReducer,
});
