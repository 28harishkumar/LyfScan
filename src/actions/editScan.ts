import * as Constants from './constants';
import { SavedDocumentProps } from '@src/types/doc';
import { DocumentStorage } from '@src/storage';
import { refreshDocuments } from './documentList';

export const onSwap = (activePage: number) => ({
  type: Constants.SWAP_PAGE,
  activePage,
});

export const saveDocument = (pdfDocument: SavedDocumentProps) => {
  return async dispatch => {
    // TODO: finalUri will be set by filters in EditScan Screen

    pdfDocument.documents = pdfDocument.documents.map(d => {
      if(!d.finalUri) {
        d.finalUri = d.croppedUri;
      }

      return d;
    });

    // add document to storage
    pdfDocument = await DocumentStorage.storeDocument(pdfDocument);

    return refreshDocuments(pdfDocument.folderId)(dispatch);
  };
};

// TODO: more actions are in progress
