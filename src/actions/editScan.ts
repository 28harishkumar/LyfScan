import * as Constants from './constants';
import { SavedDocumentProps } from '@src/types/doc';
import { DocumentStorage } from '@src/storage';

export const onSwap = (activePage: number) => ({
  type: Constants.SWAP_PAGE,
  activePage,
});

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
