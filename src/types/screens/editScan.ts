import * as ACTION from '@src/actions/constants';
import { SavedDocumentProps, ScannedDocumentProps } from '../doc';

export type EditScanState = {
  activePage: number;
  pdfDocument: SavedDocumentProps;
  shouldShowNameForm: boolean;
  documentModified: boolean;
  confirmModificationRejection: boolean;
  showPageReorder: boolean;
  showColorOptions: boolean;
  applyColorToAll: boolean;
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
      type: typeof ACTION.SHOW_DOCUMENT_NAME_FORM;
      shouldShowNameForm: boolean;
    }
    | {
      type: typeof ACTION.SET_SCAN_DOCUMENT_NAME;
      pdfDocument: SavedDocumentProps;
    }
    | {
      type: typeof ACTION.REQUEST_DISCARD_CHANGES;
    }
    | {
      type: typeof ACTION.REJECT_DISCARD_CHANGES;
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
      type: typeof ACTION.TOGGLE_CROP_MODAL;
      showRecropOnImage: boolean;
    }
    | {
      type: typeof ACTION.RECROP_PAGE;
      pdfDocument: SavedDocumentProps;
      showRecropOnImage: boolean;
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
      doc: SavedDocumentProps;
      index: number;
      page: ScannedDocumentProps;
      effect: string; // TODO
    }
    | {
      type: typeof ACTION.REPLACE_PAGE;
      doc: SavedDocumentProps;
      index: number;
      page: ScannedDocumentProps;
    }
    | {
      type: typeof ACTION.DELETE_PAGE_REQUEST;
    }
    | {
      type: typeof ACTION.DELETE_PAGE_REJECT;
    }
    | {
      type: typeof ACTION.DELETE_PAGE;
      pdfDocument: SavedDocumentProps;
      showDeletePageWarning: boolean;
    }>;
