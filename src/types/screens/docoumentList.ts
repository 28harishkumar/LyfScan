import * as ACTION from '@src/actions/constants';
import {
  ContactProps,
  SavedDocumentProps,
} from '../doc';

export type FolderProps = {
  folderId?: number;
  name: string;
  folders: FolderProps[];
  documents: SavedDocumentProps[];
  deepthNumber: number;
  parentFolderId: number;
};

export type DocumentListState = {
  tabIndex: number;
  contacts: ContactProps[];
  currentFolder: FolderProps;
  showSearch: boolean;
  searchText: string;
  selectedDocument: number;
  selectedDocumentIndex: number;
  numberOfLoadedDocuments: number;
  viewDocument: SavedDocumentProps;

  /**
   * More to be added like:
   * Photos
   * IDs and passports
   */
};

export type DocumentListActionProps =
  {
    type: typeof ACTION.DOCUMENTS_TAB_CHANGE,
    tabIndex: number,
  }
  | {
    type: typeof ACTION.SHOW_DOCUMENT_SEARCH;
  }
  | {
    type: typeof ACTION.HIDE_DOCUMENT_SEARCH;
  }
  | {
    type: typeof ACTION.SEARCH_TEXT_CHANGE;
    searchText: string;
  }
  | {
    type: typeof ACTION.VIEW_DOCUMENT;
  }
  | {
    type: typeof ACTION.LYFSCAN_DOCUMENT_SHARE;
    pdfDocument: SavedDocumentProps[];
  }
  | {
    type: typeof ACTION.RENAME_DOCUMENT;
    name: string;
    pdfDocument: SavedDocumentProps;
  }
  | {
    type: typeof ACTION.DELETE_DOCUMENT_REQUEST;
  }
  | {
    type: typeof ACTION.DELETE_DOCUMENT_REJECT;
  }
  | {
    type: typeof ACTION.DELETE_DOCUMENT;
    index: number;
    pdfDocuement: SavedDocumentProps;
  }
  | {
    type: typeof ACTION.MOVE_TO_FOLDER;
    index: number;
    pdfDocuement: SavedDocumentProps;
  }
  | {
    type: typeof ACTION.SELECT_DOCUMENT;
    index: number;
    pdfDocuement: SavedDocumentProps;
  }
  | {
    type: typeof ACTION.REFRESH_DOCUMENTS;
  }
  | {
    type: typeof ACTION.LOAD_MORE_DOCUMENTS;
  };
