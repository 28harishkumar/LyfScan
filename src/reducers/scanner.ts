import { ScannerState } from '@src/types/screens/scanner';
import { ScannerActionProps } from '@src/types/screens/scanner';

const initialState: ScannerState = {
  activeTab: 2,
  popupConfirmed: false,
  capturedDocument: null,
  showDocumentPreview: false,
  confirmedDocuments: null,
  useFlash: 'on',
  autoCapture: true,

  askScanRejection: false,
  orcLanguage: 'en',
  showOCRLanguageList: false,
};

export default function reducer(state = initialState, action: ScannerActionProps) {
  switch (action.type) {
    case 'TAB_CHANGE':
      return {
        ...state,
        activeTab: action.activeTab,
      };
    default:
      return state;
  }
}
