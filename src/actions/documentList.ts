import * as Constants from './constants';
import { FolderProps } from '@src/types/screens/docoumentList';
import { SavedDocumentProps } from '@src/types/doc';
import {
  FolderStorage,
} from '@src/storage';

export const refreshDocuments = (tab: string) => {
  return async dispatch => {
    try {
      const currentFolder: FolderProps = await FolderStorage.getFolder(tab);
      const numberOfLoadedDocuments = !!currentFolder ? currentFolder.documents.length : 0;

      dispatch({
        type: Constants.REFRESH_DOCUMENTS,
        currentFolder,
        numberOfLoadedDocuments,
      });
    } catch (e) {
      dispatch({
        type: Constants.REFRESH_DOCUMENTS,
      });
    }
  };
};

export const selectViewDocument = (viewDocument: SavedDocumentProps) => ({
  type: Constants.VIEW_DOCUMENT,
  viewDocument,
});


export const createFolder = (folder: FolderProps) => {
  // TODO: create folder
  return {
    type: Constants.CREATE_FOLDER,
  };
};

export const setSearchOpen = (showSearch: boolean) => ({
  type: Constants.SET_DOCUMENT_SEARCH,
  showSearch,
});

export const filterDocuments = (name: string) => {
  if (name) {
    // TODO: search
  }
};

export const modifyDocument = (pdfDocument: SavedDocumentProps) => ({
  type: Constants.MODIFY_DOCUMENT,
  pdfDocument,
  activePage: 0,
});


// TODO: more actions are in progress
