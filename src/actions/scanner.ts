import { FlashProps } from '@src/types/screens/scanner';
import { ScannedDocumentProps, SavedDocumentProps } from '@src/types/doc';
import * as Constants from './constants';
import * as Utilities from '@src/core/Utilities';

export const onTabChange = (activeTab: number) => ({
  type: Constants.TAB_CHANGE,
  activeTab,
  popupConfirmed: false,
});

export const onPopupConfirmed = () => ({
  type: Constants.POP_UP_CONFIRMED,
  popupConfirmed: true,
});

export const onOCRLanguageRequest = () => ({
  type: Constants.OCR_Language_REQUEST,
  showOCRLanguageList: true,
});

export const onOCRLanguageChange = (language: string) => ({
  type: Constants.OCR_LANGUAGE_CHANGE,
  showOCRLanguageList: false,
  language,
});

export const onFlashChange = (useFlash: FlashProps) => ({
  type: Constants.FLASH_CHANGE,
  useFlash,
});

export const onAutoCaptureChange = (autoCapture: boolean) => ({
  type: Constants.AUTO_CAPTURE_CHANGE,
  autoCapture,
});

export const onDocumentCapture = (capturedDocument: ScannedDocumentProps) => ({
  type: Constants.DOCUMENT_CAPTURED,
  capturedDocument,
});

export const onDocumentAccepted = (capturedDocument: ScannedDocumentProps) => ({
  type: Constants.DOCUMENT_ACCEPTED,
  capturedDocument,
});

export const onDocumentRejected = () => ({
  type: Constants.DOCUMENT_REJECED,
  capturedDocument: null,
});

export const goToDocumentEdit = (pdfDocument: SavedDocumentProps) => {
  return (dispatch) => {
    dispatch({
      // note this type will be in edit document page
      type: Constants.MODIFY_DOCUMENT,
      pdfDocument,
    });
  };
};

export const showScanNotSavedWarning = (askScanRejection: boolean) => ({
  type: Constants.SHOW_SCAN_NOT_SAVED_WARNING,
  askScanRejection,
});

export const resetScannerState = () => ({
  type: Constants.RESET_SCANNER_STATE,
});
