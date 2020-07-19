import * as Constants from './constants';
import { FolderProps } from '@src/types/screens/docoumentList';
import { SavedDocumentProps } from '@src/types/doc';
import {
  DocumentStorage,
  FolderStorage,
} from '@src/storage';

export const refreshDocuments = (tab: number) => {
  return dispatch => {
    const currentFolder: FolderProps = FolderStorage.getRootFolder(tab);
    const numberOfLoadedDocuments = currentFolder.documents;

    dispatch({
      type: Constants.REFRESH_DOCUMENTS,
      currentFolder,
      numberOfLoadedDocuments,
    });
  };
};

export const saveDocument = async (pdfDocument: SavedDocumentProps) => {
  /**
   * TODO:
   *   1. Save files on filesystem
   *   2. Put links in database
   */

  return async dispatch => {
    // add document to storage
    pdfDocument = await DocumentStorage.storeDocument(pdfDocument);

    dispatch({
      type: Constants.SAVE_DOCUMENT_PDF,
      pdfDocument,
    });
  };
};

// TODO: more actions are in progress
