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
  croppedPosition: {
    topLeft: number;
    topRight: number;
    bottomLeft: number;
    bootomRight: number; 
  };

  // position of image in multiple document list
  position: number;
};

export type SavedDocumentProps = ScannedDocumentProps & {
  name: string;
  create_time: Date;
  thumbnailUri: string;
  pdfUri: string;
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
}