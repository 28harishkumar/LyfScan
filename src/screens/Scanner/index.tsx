import React from 'react';

import { connect } from 'react-redux';
import { Alert, BackHandler } from 'react-native';
import { FlashProps } from '@src/types/screens/scanner';
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
import { ScannerManager } from '@28harishkumar/react-native-scanner';

// TODO: add Props type
type Props = any;

class ScannerContainer extends React.PureComponent<Props> {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.goToDocuments();
    return true;
  }

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
      name: Utilities.getDate(null, 'DD-MM-YYYY') + '.pdf',
      create_time: new Date(),
      thumbnailUri: thumb,
      documents: confirmedDocuments,
      pdfUri: null,
      folderId: '2',

      // TODO: set correct document type
      documentType: 'document',
    };
  }

  goToScanEdit = () => {
    const pdfDocument: SavedDocumentProps = this.getPDFDocument();

    if (pdfDocument) {
      this.props.dispatch(goToScanEdit(pdfDocument));
      ScannerManager.stop();
      this.props.navigation.navigate('EditScan');
    }
  };

  goToDocuments = () => {
    const { capturedDocument, confirmedDocuments } = this.props;

    if (!capturedDocument && !confirmedDocuments) {
      this.props.dispatch(resetScannerState());
      this.props.dispatch(refreshDocuments('2'));
      ScannerManager.stop();
      this.props.navigation.navigate('DocumentList');
    } else {
      this.props.showScanNotSavedWarning(true);
    }
  }

  forceGoToDocuments = () => {
    this.props.dispatch(resetScannerState());
    ScannerManager.stop();
    this.props.navigation.navigate('DocumentList');
  }

  rejectGoToDocuments = () => {
    this.props.showScanNotSavedWarning(false);
  }

  onDocumentAccepted = (image: string, finalUri: string, croppedPosition: RectCoordinates) => {
    const {
      onDocumentAccepted: onDocumentAcceptedAction,
      capturedDocument,
    } = this.props;
    const croppedDocument: ScannedDocumentProps = {
      ...capturedDocument,
      finalUri,
      croppedPosition,
    };

    onDocumentAcceptedAction(croppedDocument);
  }

  render() {
    return <Component
      activeTab={this.props.activeTab}
      popupConfirmed={this.props.popupConfirmed}
      capturedDocument={this.props.capturedDocument}
      confirmedDocuments={this.props.confirmedDocuments}
      showDocumentPreview={this.props.showDocumentPreview}
      useFlash={this.props.useFlash}
      autoCapture={this.props.autoCapture}
      askScanRejection={this.props.askScanRejection}
      orcLanguage={this.props.orcLanguage}
      showOCRLanguageList={this.props.showOCRLanguageList}
      onTabChange={this.props.onTabChange}
      onPopupConfirmed={this.props.onPopupConfirmed}
      onOCRLanguageRequest={this.props.onOCRLanguageRequest}
      onOCRLanguageChange={this.props.onOCRLanguageChange}
      onFlashChange={this.props.onFlashChange}
      onAutoCaptureChange={this.props.onAutoCaptureChange}
      onDocumentCapture={this.onDocumentCapture}
      onDocumentAccepted={this.onDocumentAccepted}
      onDocumentRejected={this.props.onDocumentRejected}
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
