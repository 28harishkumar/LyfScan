import * as ACTION from '@src/actions/constants';
import { SavedDocumentProps, ScannedDocumentProps } from '../doc';

export type EditScanState = {
  activePage: number;
  pdfDocument: SavedDocumentProps;
  showNameChangeForm: boolean;
  documentModified: boolean;
  confirmModificationRejection: boolean;
  showPageReorder: boolean;
  showColourOptions: boolean;
  applyColourToAll: boolean;
  showDeletePageWarning: boolean;
  showRecropOnImage: boolean;
};

export type EditScanActionProps =
  // Reset State
  Partial<{
    type: typeof ACTION.RESET_EDIT_SCAN_STATE;
  }
  | {
    type: typeof ACTION.MODIFY_DOCUMENT;
    pdfDocument: SavedDocumentProps;
    activePage: number;
  }
  | {
    type: typeof ACTION.EDIT_DOCUMENT_NAME;
  }
  | {
    type: typeof ACTION.SET_DOCUMENT_NAME;
    name: string;
  }
  | {
    type: typeof ACTION.SAVE_DOCUMENT_PDF;
    pdfDocument: SavedDocumentProps;
  }
  | {
    type: typeof ACTION.REQUEST_DISCARD_CHANGES;
  }
  | {
    type: typeof ACTION.REJECT_DISCARD_CHANGES;
  }
  | {
    type: typeof ACTION.DISCARD_CHANGES;
  }
  | {
    type: typeof ACTION.SWAP_PAGE;
    activePage: number;
  }
  | {
    type: typeof ACTION.ADD_NEW_PAGE;
    pdfDocument: SavedDocumentProps;
  }
  | {
    type: typeof ACTION.REORDER_PAGES;
  }
  | {
    type: typeof ACTION.RECROP_PAGE;
  }
  | {
    type: typeof ACTION.ROTATE_PAGE;
    index: number;
  }
  | {
    type: typeof ACTION.SHOW_COLOR_OPTIONS;
  }
  | {
    type: typeof ACTION.HIDE_COLOR_OPTIONS;
  }
  | {
    type: typeof ACTION.SET_PAGE_COLOR;
    index: number;
    scannedDoc: ScannedDocumentProps,
    effect: string; // TODO
  }
  | {
    type: typeof ACTION.DELETE_PAGE_REQUEST;
  }
  | {
    type: typeof ACTION.DELETE_PAGE_REJECT;
  }
  | {
    type: typeof ACTION.DELETE_PAGE;
    index: number;
  }>;
