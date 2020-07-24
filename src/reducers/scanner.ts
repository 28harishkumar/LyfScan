import * as Constant from '@src/actions/constants';
import {
  ScannerState,
  ScannerActionProps,
} from '@src/types/screens/scanner';
import { ScannedDocumentProps } from '@src/types/doc';

const initialState: ScannerState = {
  activeTab: 2,
  popupConfirmed: false,
  pdfDocument: null,
  capturedDocument: null,
  showDocumentPreview: false,
  confirmedDocuments: null,
  useFlash: 'on',
  autoCapture: true,

  askScanRejection: false,
  ocrLanguage: 'en',
  showOCRLanguageList: false,
};

export default function reducer(state = initialState, action: ScannerActionProps) {
  const { type: actoinType, ...restProps } = action;

  switch (action.type) {
    case Constant.RESET_SCANNER_STATE:
      return {
        ...state,
        activeTab: 2,
        popupConfirmed: false,
        pdfDocument: null,
        capturedDocument: null,
        confirmedDocuments: null,
        showDocumentPreview: false,
        askScanRejection: false,
        showOCRLanguageList: false,
      };
    case Constant.TAB_CHANGE:
    case Constant.POP_UP_CONFIRMED:
    case Constant.OCR_Language_REQUEST:
    case Constant.OCR_LANGUAGE_CHANGE:
    case Constant.FLASH_CHANGE:
    case Constant.AUTO_CAPTURE_CHANGE:
    case Constant.DOCUMENT_CAPTURED:
    case Constant.DOCUMENT_REJECED:
    case Constant.SHOW_SCAN_NOT_SAVED_WARNING:
      return {
        ...state,
        ...restProps,
      };
    case Constant.DOCUMENT_ACCEPTED:
      let confirmedDocuments: ScannedDocumentProps[];

      if (state.confirmedDocuments) {
        confirmedDocuments = [
          ...state.confirmedDocuments,
          {
            ...action.capturedDocument,
          },
        ];
      } else {
        confirmedDocuments = [{ ...action.capturedDocument }];
      }

      return {
        ...state,
        confirmedDocuments,
        capturedDocument: null,
        showDocumentPreview: false,
      };
    default:
      return state;
  }
}
