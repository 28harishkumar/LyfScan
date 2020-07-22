import React from 'react';

import { connect } from 'react-redux';
import { Alert, BackHandler } from 'react-native';
import { FlashProps, ScannerState } from '@src/types/screens/scanner';
import { ScannedDocumentProps, SavedDocumentProps, RectCoordinates } from '@src/types/doc';
import * as Utilities from '@src/core/Utilities';
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
      routes: [{ name: 'DocumentList' }],
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
    };

    this.props.onDocumentCapture(capturedDocument);
  }

  /**
   * Format images into SavedDocumentProps form
   */
  getPDFDocument = (): SavedDocumentProps => {
    const { pdfDocument, confirmedDocuments } = this.props;

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
      name: Utilities.getDate(null, 'DD-MM-YYYY-Z') + '.pdf',
      create_time: new Date(),
      thumbnailUri: thumb,
      documents: confirmedDocuments,
      pdfUri: null,
      folderId: '2',

      // TODO: set correct document type
      documentType: 'document',
    };
  }

  /**
   * Proceed to edit Scanned Images to generate PDF/ OCR
   */
  goToScanEdit = () => {
    const pdfDocument: SavedDocumentProps = this.getPDFDocument();

    if (pdfDocument) {
      this.props.dispatch(goToScanEdit(pdfDocument));
      this.prepareSafeLeave('EditScan');
    }
  };

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
  onDocumentAccepted = (image: string, finalUri: string, croppedPosition: RectCoordinates) => {
    const { capturedDocument } = this.props;
    const croppedDocument: ScannedDocumentProps = {
      ...capturedDocument,
      finalUri,
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
