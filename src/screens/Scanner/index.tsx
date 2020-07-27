import React from 'react';

import { connect } from 'react-redux';
import { Alert, BackHandler, Image } from 'react-native';
import { FlashProps, ScannerState } from '@src/types/screens/scanner';
import { ScannedDocumentProps, SavedDocumentProps, RectCoordinates } from '@src/types/doc';
import {
  onTabChange,
  onPopupConfirmed,
  onOCRLanguageRequest,
  onOCRLanguageChange,
  onFlashChange,
  onAutoCaptureChange,
  onDocumentCapture,
  onDocumentAccepted,
  onDocumentRejected,
  goToScanEdit,
  showScanNotSavedWarning,
  resetScannerState,
} from '@src/actions/scanner';
import Component from './component';
import { refreshDocuments } from '@src/actions/documentList';
import { ImageProps } from '@src/components/DocumentPicker/ImageItem';

type Props = ScannerState & {
  dispatch: (e) => void;
  navigation: any;
  onTabChange: (activeTab: number) => void;
  onPopupConfirmed: () => void;
  onOCRLanguageRequest: () => void;
  onOCRLanguageChange: (language: string) => void;
  onFlashChange: (useFlash: FlashProps) => void;
  onAutoCaptureChange: (autoCapture: boolean) => void;
  onDocumentCapture: (capturedDocument: ScannedDocumentProps) => void;
  onDocumentAccepted: (capturedDocument: ScannedDocumentProps) => void;
  onDocumentRejected: () => void;
  showScanNotSavedWarning: (askScanRejection: boolean) => void;
};

class ScannerContainer extends React.PureComponent<Props> {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  prepareSafeLeave = (screen: string) => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.props.dispatch(resetScannerState());

    this.props.navigation.reset({
      index: 0,
      routes: [{ name: screen }],
    });
  }

  /**
   * on device back button press
   */
  handleBackButtonClick = () => {
    this.goToDocuments();
    return true;
  }

  /**
   * Camera capture
   *
   * @param data Scanner module response on camera capture
   */
  onDocumentCapture = (data) => {
    const capturedDocument: ScannedDocumentProps = {
      originalUri: data.initialImage,
      croppedUri: data.croppedImage,
      finalUri: null,
      croppedPosition: data.rectangleCoordinates,
      position: 1,
      height: data.height,
      width: data.width,
      effect: null,
    };

    this.props.onDocumentCapture(capturedDocument);
  }

  /**
   * Format images into SavedDocumentProps form
   */
  getPDFDocument = (confirmedDocuments: ScannedDocumentProps[]): SavedDocumentProps => {
    const { pdfDocument, activeTab } = this.props;
    const documentType = [
      'ocr',
      'card',
      'document',
    ][activeTab];
    const docStart = documentType[0].toUpperCase() + documentType.slice(1);
    const docNo = (new Date()).getTime().toString().slice(5);
    const docName = docStart + ' ' + docNo;

    if (!confirmedDocuments) {
      // TODO: show tooltip
      Alert.alert(
        'Add a document first',
        'First add a document and then tap again to proceed.',
      );

      return null;
    }

    const thumb = confirmedDocuments[0].finalUri || confirmedDocuments[0].croppedUri;

    if (pdfDocument) {
      return {
        ...pdfDocument,
        documents: confirmedDocuments,
        thumbnailUri: thumb,
      };
    }

    return {
      name: docName,
      create_time: new Date().getTime(),
      thumbnailUri: thumb,
      documents: confirmedDocuments,
      pdfUri: null,
      folderId: '2',

      // TODO: set correct document type
      documentType,
    };
  }

  /**
   * Proceed to edit Scanned Images to generate PDF/ OCR
   */
  goToScanEdit = () => {
    const { confirmedDocuments } = this.props;
    const pdfDocument: SavedDocumentProps = this.getPDFDocument(confirmedDocuments);

    if (pdfDocument) {
      this.props.dispatch(goToScanEdit(pdfDocument));
      this.prepareSafeLeave('EditScan');
    }
  };

  /**
   * Pick images from gallery
   */
  pickFromGallery = async (images: ImageProps[]) => {
    const confirmedDocuments: ScannedDocumentProps[] = await Promise.all(
      images.map(async img => {
        let width: number, height: number;

        await Image.getSize(img.uri, (w, h) => {
          width = w;
          height = h;
        }, () => {
          width = null;
          height = null;
        });

        return {
          originalUri: img.uri,
          croppedUri: img.uri,
          finalUri: img.uri,
          croppedPosition: null,
          position: 1,
          height,
          width,
          croppedHeight: height,
          croppedWidth: width,
          effect: null,
        };
      }),
    );

    const pdfDocument: SavedDocumentProps = this.getPDFDocument(confirmedDocuments);

    if (pdfDocument) {
      this.props.dispatch(goToScanEdit(pdfDocument));
      this.prepareSafeLeave('EditScan');
    }
  }

  /**
   * Navigate to document screen
   */
  goToDocuments = () => {
    const { capturedDocument, confirmedDocuments } = this.props;

    if (!capturedDocument && !confirmedDocuments) {
      this.props.dispatch(refreshDocuments('2'));
      this.prepareSafeLeave('DocumentList');
    } else {
      this.props.showScanNotSavedWarning(true);
    }
  }

  /**
   * Discard current Scans and Navigate to document screen
   */
  forceGoToDocuments = () => {
    this.prepareSafeLeave('DocumentList');
    this.props.dispatch(refreshDocuments('2'));
  }

  /**
   * Show warning before discarding Scans
   */
  rejectGoToDocuments = () => {
    this.props.showScanNotSavedWarning(false);
  }

  /**
   * User confirmed final image
   *
   * @param image base64
   * @param finalUri string
   * @param croppedPosition Corodinates
   */
  onDocumentAccepted = (response: any, croppedPosition: RectCoordinates) => {
    const { capturedDocument } = this.props;
    const croppedDocument: ScannedDocumentProps = {
      ...capturedDocument,
      croppedWidth: response.width,
      croppedHeight: response.height,
      croppedUri: response.imagePath,
      finalUri: response.imagePath,
      croppedPosition,
    };

    this.props.onDocumentAccepted(croppedDocument);
  }

  /**
   * On Scan image rejection (retake)
   */
  onDocumentRejected = () => {
    this.props.onDocumentRejected();
  }

  render() {
    return <Component
      activeTab={this.props.activeTab}
      popupConfirmed={this.props.popupConfirmed}
      capturedDocument={this.props.capturedDocument}
      confirmedDocuments={this.props.confirmedDocuments}
      showDocumentPreview={!!this.props.capturedDocument}
      useFlash={this.props.useFlash}
      autoCapture={this.props.autoCapture}
      askScanRejection={this.props.askScanRejection}
      ocrLanguage={this.props.ocrLanguage}
      showOCRLanguageList={this.props.showOCRLanguageList}
      onTabChange={this.props.onTabChange}
      onPopupConfirmed={this.props.onPopupConfirmed}
      onOCRLanguageRequest={this.props.onOCRLanguageRequest}
      onOCRLanguageChange={this.props.onOCRLanguageChange}
      onFlashChange={this.props.onFlashChange}
      onAutoCaptureChange={this.props.onAutoCaptureChange}
      onDocumentCapture={this.onDocumentCapture}
      onDocumentAccepted={this.onDocumentAccepted}
      onDocumentRejected={this.onDocumentRejected}
      pickFromGallery={this.pickFromGallery}
      goToScanEdit={this.goToScanEdit}
      goToDocuments={this.goToDocuments}
      forceGoToDocuments={this.forceGoToDocuments}
      rejectGoToDocuments={this.rejectGoToDocuments}
    />;
  }
}

const mapStateToProps = state => state.scanner;

const mapDispatchToProps = dispatch => ({
  onTabChange: (activeTab: number) => dispatch(onTabChange(activeTab)),
  onPopupConfirmed: () => dispatch(onPopupConfirmed()),
  onOCRLanguageRequest: () => dispatch(onOCRLanguageRequest()),
  onOCRLanguageChange: (language: string) => dispatch(onOCRLanguageChange(language)),
  onFlashChange: (useFlash: FlashProps) => dispatch(onFlashChange(useFlash)),
  onAutoCaptureChange: (autoCapture: boolean) => dispatch(onAutoCaptureChange(autoCapture)),
  onDocumentCapture: (capturedDocument: ScannedDocumentProps) => dispatch(onDocumentCapture(capturedDocument)),
  onDocumentAccepted: (capturedDocument: ScannedDocumentProps) => dispatch(onDocumentAccepted(capturedDocument)),
  onDocumentRejected: () => dispatch(onDocumentRejected()),
  showScanNotSavedWarning: (askScanRejection: boolean) => dispatch(showScanNotSavedWarning(askScanRejection)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ScannerContainer);
