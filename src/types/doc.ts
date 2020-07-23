type Coordinate = {
  x: number;
  y: number;
};

export type RectCoordinates = {
  topLeft: Coordinate;
  topRight: Coordinate;
  bottomLeft: Coordinate;
  bootomRight: Coordinate;
};

// Scanned Document
export type ScannedDocumentProps = {
  // permanent id given after save
  id?: number;

  // temp id given before save
  localId?: string;

  // orignal uri of image taken
  originalUri: string;

  // original cropped image
  croppedUri: string;

  // cropped image after appling effects
  finalUri: string;

  // crop position
  croppedPosition: RectCoordinates;

  // position of image in multiple document list
  position: number;

  // TODO: ENUM
  effect: string;

  // original size
  height: number;
  width: number;

  // cropped size
  croppedHeight?: number;
  croppedWidth?: number;
};

export type SavedDocumentProps = {
  id?: string;
  folderId?: string;
  name: string;
  create_time: number;
  thumbnailUri: string;
  documents: ScannedDocumentProps[];
  pdfUri: string;

  // TODO: documentType is under progress
  documentType: 'document' | 'photo' | 'contact' | string;
};

export type ContactProps = {
  name: string;
  companyName: string;
  designation: string;
  email: string;
  mobileNumbers: string[];
  faxNumbers: string[];
  website: string;
  address: string;
  cardUri: string;
};
