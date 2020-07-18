import { ScannedDocumentProps, SavedDocumentProps } from '../doc';
import * as ACTION from '@src/actions/constants';

export type TabAction = typeof ACTION.TAB_CHANGE | typeof ACTION.POP_UP_CONFIRMED;
export type OCRAction = typeof ACTION.OCR_Language_REQUEST | typeof ACTION.OCR_LANGUAGE_CHANGE;
export type PreferenceAction = typeof ACTION.FLASH_CHANGE | typeof ACTION.AUTO_CAPTURE_CHANGE;
export type NavigationAction = typeof ACTION.MODIFY_DOCUMENT | typeof ACTION.SHOW_SCAN_NOT_SAVED_WARNING;
export type DocumentAction = typeof ACTION.DOCUMENT_CAPTURED
| typeof ACTION.DOCUMENT_ACCEPTED
| typeof ACTION.DOCUMENT_REJECED;

export type FlashProps = 'on' | 'off' | 'auto';

export type ScannerState = {
  // scanner tab
  activeTab: number;

  // popup confirmed
  popupConfirmed: boolean;

  // captured document that is in process
  capturedDocument: ScannedDocumentProps;

  // pdfDocument in case of edit document
  pdfDocument: SavedDocumentProps;

  // preview document after capture (for manual cropping)
  showDocumentPreview: boolean;

  // documents that has been accepted
  confirmedDocuments: ScannedDocumentProps[];

  useFlash: FlashProps;
  autoCapture: boolean;

  // alert popup when user leave screen without saving documents
  askScanRejection: boolean;

  // selected language for OCR
  orcLanguage: string;

  // show available languages for OCR
  showOCRLanguageList: boolean;
};

export type ScannerActionProps =
  // Reset State
  {
    type: typeof ACTION.RESET_SCANNER_STATE,
  }
  | {
    // TabAction
    type: TabAction;
    activeTab?: number;
  }
  | {
    // OCRAction
    type: OCRAction;
    language?: string;
  }
  | {
    // DocumentAction
    type: DocumentAction;
    capturedDocument?: ScannedDocumentProps;
  }
  | {
    // PreferenceAction
    type: PreferenceAction;
    useFlash?: FlashProps;
    autoCapture?: boolean;
  }
  | {
    // NavigationAction
    type: NavigationAction;
    pdfDocument?: SavedDocumentProps;
    askScanRejection?: boolean;
  };
