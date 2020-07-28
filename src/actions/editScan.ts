import * as Constants from './constants';
import { SavedDocumentProps, ScannedDocumentProps } from '@src/types/doc';
import { DocumentStorage } from '@src/storage';
import { refreshDocuments } from './documentList';

export const resetState = () => ({
  type: Constants.RESET_EDIT_SCAN_STATE,
});

export const onSwap = (activePage: number) => ({
  type: Constants.SWAP_PAGE,
  activePage,
});

export const saveDocument = (pdfDocument: SavedDocumentProps) => {
  return async dispatch => {
    // TODO: finalUri will be set by filters in EditScan Screen

    pdfDocument.documents = pdfDocument.documents.map(d => {
      if (!d.finalUri) {
        d.finalUri = d.croppedUri;
      }

      return d;
    });

    // add document to storage
    pdfDocument = await DocumentStorage.storeDocument(pdfDocument);

    return refreshDocuments(pdfDocument.folderId)(dispatch);
  };
};

export const discardChangeRequest = () => ({
  type: Constants.REQUEST_DISCARD_CHANGES,
});

export const rejectDiscardRequest = () => ({
  type: Constants.REJECT_DISCARD_CHANGES,
});

export const showNameChangeForm = (shouldShowNameForm: boolean) => ({
  type: Constants.SHOW_DOCUMENT_NAME_FORM,
  shouldShowNameForm,
});

export const updatePdfName = (doc: SavedDocumentProps, name: string) => ({
  type: Constants.SET_SCAN_DOCUMENT_NAME,
  shouldShowNameForm: false,
  pdfDocument: {
    ...doc,
    name,
  },
});

export const toggleCropModal = (showRecropOnImage: boolean) => ({
  type: Constants.TOGGLE_CROP_MODAL,
  showRecropOnImage,
});

export const cropImage = (pdfDocument: SavedDocumentProps) => ({
  type: Constants.RECROP_PAGE,
  showRecropOnImage: false,
  pdfDocument,
});

export const showColorFilters = () => ({
  type: Constants.SHOW_COLOR_OPTIONS,
  showColorOptions: true,
});

export const hideColorFilters = () => ({
  type: Constants.HIDE_COLOR_OPTIONS,
  showColorOptions: false,
});

export const selectColorFilter = (
  pdfDocument: SavedDocumentProps,
  page: ScannedDocumentProps,
  index: number) => {

  pdfDocument.documents[index] = page;

  return ({
    type: Constants.SET_PAGE_COLOR,
    pdfDocument,
  });
  };

export const deletePageRequest = () => ({
  type: Constants.DELETE_PAGE_REQUEST,
  showDeletePageWarning: true,
});

export const deletePageDiscard = () => ({
  type: Constants.DELETE_PAGE_REJECT,
  showDeletePageWarning: false,
});

export const deletePage = (pdfDocument: SavedDocumentProps) => ({
  type: Constants.DELETE_PAGE,
  showDeletePageWarning: false,
  pdfDocument,
});


// TODO: more actions are in progress
