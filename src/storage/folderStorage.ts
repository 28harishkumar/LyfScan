import { FolderProps } from '@src/types/screens/docoumentList';
import AsyncStorage from '@react-native-community/async-storage';

export async function GetAllContent(): Promise<FolderProps[]> {
  try {
    const allContent: FolderProps[] = JSON.parse(await AsyncStorage.getItem('content'));
    return allContent;
  } catch (e) {
    return null;
  }
}

export async function IntiDirectory() {
  const content = await GetAllContent();
  const allContent: FolderProps[] = [
    {
      name: 'Root',
      folderId: '0',
      documents: [],
      deepthNumber: 0,
      parentFolderId: null,
    },
    {
      name: 'Shared Documents',
      folderId: '1',
      documents: [],
      deepthNumber: 1,
      parentFolderId: '0',
    },
    {
      name: 'Documents',
      folderId: '2',
      documents: [],
      deepthNumber: 1,
      parentFolderId: '0',
    },
    {
      name: 'Photos',
      folderId: '3',
      documents: [],
      deepthNumber: 1,
      parentFolderId: '0',
    },
  ];

  if (!content) {
    await AsyncStorage.setItem('content', JSON.stringify(allContent));
  }
}

async function getFolder(folderId: string) {
  try {
    return (await GetAllContent()).filter(f => f.folderId === folderId).pop();
  } catch (e) {
    return null;
  }
}

const FolderStorage = {
  getFolder,
  createFolder: (parentFolder: FolderProps, name: string) => {
    // TODO:
  },

  deleteFolder: (id: string) => {
    // TODO:
  },
};

export { FolderStorage };
