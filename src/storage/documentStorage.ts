import RNImageToPdf from 'react-native-image-to-pdf';
import { SavedDocumentProps } from '@src/types/doc';
import AsyncStorage from '@react-native-community/async-storage';
import { FolderProps } from '@src/types/screens/docoumentList';
import { GetAllContent } from './folderStorage';

async function getDocuments (folderId?: string) {
  folderId = folderId || '2';

  try {
    const allContent: FolderProps[] = await GetAllContent();
    return allContent
      .filter(f => f.folderId === folderId)
      .pop()
      .documents;

  } catch (e) {
    return [];
  }
}

async function storeDocument(pdfDocument: SavedDocumentProps) {
  try {
    const options = {
      imagePaths: pdfDocument.documents.map(d => d.finalUri.replace('file://', '')),
      name: pdfDocument.name,
      quality: 1, // optional compression paramter
      maxSize: {
        maxWidth: 794,
        maxHeight: 1123,
      },
    };

    const pdf = await RNImageToPdf.createPDFbyImages(options);
    const folderId = pdfDocument.folderId;
    const folderDocuments = await getDocuments(folderId);
    const oldDocument = folderDocuments.filter(d => d.id === pdfDocument.id).pop();

    pdfDocument.pdfUri = pdf.filePath;
    pdfDocument.id = pdfDocument.id || new Date().getTime().toString();

    // TODO: encrypt document
    const newDocuments = [
      ...folderDocuments.filter(d => d.id !== pdfDocument.id),
      pdfDocument,
    ];

    const allContent = await GetAllContent();
    allContent[folderId].documents = newDocuments;

    await AsyncStorage.setItem('content', JSON.stringify(allContent));

    // TODO: remove temp files
    // TODO: remove oldDocument files
    return pdfDocument;
  } catch (e) {
    throw e;
  }
}

const DocumentStorage = {
  storeDocument,
  getDocuments,

  deleteDocument: (id?: string) => {
    // TODO:
  },

  deleteMultipleDocuments: (ids?: string[]) => {
    // TODO:
  },
};

export { DocumentStorage };
