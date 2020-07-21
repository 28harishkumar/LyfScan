import * as Constants from './constants';
import { FolderProps } from '@src/types/screens/docoumentList';
import { SavedDocumentProps } from '@src/types/doc';
import {
  FolderStorage,
} from '@src/storage';

export const refreshDocuments = (tab: string) => {
  return async dispatch => {
    const currentFolder: FolderProps = await FolderStorage.getFolder(tab);
    const numberOfLoadedDocuments = currentFolder.documents.length;

    dispatch({
      type: Constants.REFRESH_DOCUMENTS,
      currentFolder,
      numberOfLoadedDocuments,
    });
  };
};

export const selectViewDocument = (viewDocument: SavedDocumentProps) => ({
  type: Constants.VIEW_DOCUMENT,
  viewDocument,
});

// TODO: more actions are in progress
