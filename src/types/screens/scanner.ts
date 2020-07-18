import { ScannedDocumentProps } from '../doc';
import * as ACTION from '@src/actions/constants';

type TabAction = typeof ACTION.TAB_CHANGE | typeof ACTION.POP_UP_CONFIRMED;
type OCRAction = typeof ACTION.OCR_Language_REQUEST | typeof ACTION.OCR_LANGUAGE_CHANGE;
type PreferenceAction = typeof ACTION.FLASH_CHANGE | typeof ACTION.AUTO_CAPTURE_CHANGE;
type NavigationAction = typeof ACTION.GO_TO_DOCUMENT_EDIT | typeof ACTION.GO_TO_DOCUMENTS;
type DocumentAction = typeof ACTION.DOCUMENT_CAPTURED
| typeof ACTION.DOCUMENT_ACCEPTED
| typeof ACTION.DOCUMENT_REJECED;

type FlashProps = 'on' | 'off' | 'auto';

export type ScannerState = {
  // scanner tab
  activeTab: number;

  // popup confirmed
  popupConfirmed: boolean;

  // captured document that is in process
  capturedDocument: ScannedDocumentProps;

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
  {
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
    confirmedDocuments: ScannedDocumentProps[];

    // force navigation is used to navigate without saving documents
    forceNavigate?: boolean;
  };
