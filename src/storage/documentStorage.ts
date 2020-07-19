import EncryptedStorage from 'react-native-encrypted-storage';
import { SavedDocumentProps } from '@src/types/doc';

const DocumentStorage = {
  storeDocument: (pdfDocument: SavedDocumentProps) => {
    // TODO:
    return pdfDocument;
  },

  getDocuments: (tabNumber?: number, folderId?: number) => {
    // TODO:
  },

  deleteDocument: (id?: number) => {
    // TODO:
  },

  deleteMultipleDocuments: (ids?: number[]) => {
    // TODO:
  },
};

export { DocumentStorage };
