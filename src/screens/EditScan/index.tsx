import React from 'react';
import { connect } from 'react-redux';
import * as EditScanActions from '@src/actions/editScan';
import { SavedDocumentProps, ScannedDocumentProps } from '@src/types/doc';

import { Component } from './component';
import { BackHandler } from 'react-native';
import { EditScanState } from '@src/types/screens/editScan';
import { refreshDocuments } from '@src/actions/documentList';

type Props = EditScanState & {
  navigation: any;
  dispatch: (e) => void;
  setActivePage: (index: number) => void;
  discardChangeRequest: () => void;
  rejectDiscardRequest: () => void;
  showNameChangeForm: (v: boolean) => void;
  updatePdfName: (doc: SavedDocumentProps, name: string) => void;

  toggleCropModal: (value: boolean) => void;
  cropImage: (doc) => void;

  showColorFilters: () => void;
  hideColorFilters: () => void;
  selectColorFilter: (doc: SavedDocumentProps, d: ScannedDocumentProps, e: number) => void;

  deletePageRequest: () => void;
  deletePageDiscard: () => void;
  deletePage: (doc) => void;

  saveDocument: (pdfDocument: SavedDocumentProps) => void;
};

class EditScan extends React.PureComponent<Props> {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  /**
   * on device back button press
   */
  handleBackButtonClick = () => {
    const { documentModified } = this.props;

    // if modification active then alert else navigate to documents
    if (documentModified) {
      this.props.discardChangeRequest();
    } else {
      this.navigateToDocuments();
    }

    return true;
  }

  /**
   * Navigate to Document list
   */
  navigateToDocuments = () => {
    const {
      dispatch,
      pdfDocument,
      navigation,
    } = this.props;

    dispatch(refreshDocuments(pdfDocument.folderId));
    navigation.reset({
      index: 0,
      routes: [{ name: 'DocumentList' }],
    });
  }
  /**
   * Confirm discard changes
   */
  onConfirmDiscardChanges = () => {
    const { dispatch } = this.props;
    dispatch(EditScanActions.resetState());

    this.navigateToDocuments();
  }

  /**
   * Save pdf file
   */
  onSave = () => {
    const {
      saveDocument: saveScannedDocument,
      pdfDocument,
    } = this.props;

    saveScannedDocument(pdfDocument);
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'DocumentList' }],
    });
  }

  /**
   * Update pdf name
   */
  setPdfName = (value: string) => {
    const {
      pdfDocument,
      showNameChangeForm,
      updatePdfName,
    } = this.props;

    if (!value) {
      return this.props.showNameChangeForm(false);
    }

    updatePdfName(pdfDocument, value);
  }

  /**
   * Crop image
   */
  cropImage = (response: any) => {
    const { pdfDocument, activePage } = this.props;

    pdfDocument.documents[activePage].finalUri = response.imagePath;
    pdfDocument.documents[activePage].croppedWidth = response.width;
    pdfDocument.documents[activePage].croppedHeight = response.height;
    pdfDocument.documents[activePage].croppedUri = response.imagePath;
    this.props.cropImage(pdfDocument);
  }

  selectColorFilter = async (effect: string) => {
    const {
      pdfDocument,
      activePage,
      applyColorToAll,
    } = this.props;

    const applyColor = (doc: ScannedDocumentProps, i: number) => {
      doc.effect = effect;
      this.props.selectColorFilter(pdfDocument, doc, i);
    };

    if (applyColorToAll) {
      pdfDocument.documents.map(applyColor);
    } else {
      applyColor(pdfDocument.documents[activePage], activePage);
    }
  }

  deletePage = () => {
    const { pdfDocument, activePage } = this.props;

    pdfDocument.documents.splice(activePage, 1);
    this.props.deletePage(pdfDocument);
  }

  render() {
    return (
      <Component
        activePage={this.props.activePage}
        setActivePage={this.props.setActivePage}
        pdfDocument={this.props.pdfDocument}

        confirmModificationRejection={this.props.confirmModificationRejection}
        rejectDiscardRequest={this.props.rejectDiscardRequest}
        onConfirmDiscardChanges={this.onConfirmDiscardChanges}

        shouldShowNameForm={this.props.shouldShowNameForm}
        showNameChangeForm={this.props.showNameChangeForm}
        updatePdfName={this.setPdfName}

        showCrop={this.props.showRecropOnImage}
        toggleCropModal={this.props.toggleCropModal}
        cropImage={this.cropImage}

        showColorOptions={this.props.showColorOptions}
        applyColorToAll={this.props.applyColorToAll}
        showColorFilters={this.props.showColorFilters}
        hideColorFilters={this.props.hideColorFilters}
        selectColorFilter={this.selectColorFilter}

        showDeletePageWarning={this.props.showDeletePageWarning}
        deletePageRequest={this.props.deletePageRequest}
        deletePageDiscard={this.props.deletePageDiscard}
        deletePage={this.deletePage}

        onCancel={this.handleBackButtonClick}
        onSave={this.onSave}
      />
    );
  }
}

const mapStateToProps = state => state.editScan;

const mapDispatchToProps = dispatch => ({
  saveDocument: (doc: SavedDocumentProps) => dispatch(EditScanActions.saveDocument(doc)),
  setActivePage: (index: number) => dispatch(EditScanActions.onSwap(index)),

  discardChangeRequest: () => dispatch(EditScanActions.discardChangeRequest()),
  rejectDiscardRequest: () => dispatch(EditScanActions.rejectDiscardRequest()),

  showNameChangeForm: (v: boolean) => dispatch(EditScanActions.showNameChangeForm(v)),
  updatePdfName: (doc: SavedDocumentProps, name: string) => dispatch(EditScanActions.updatePdfName(doc, name)),

  toggleCropModal: (value: boolean) => dispatch(EditScanActions.toggleCropModal(value)),
  cropImage: (doc) => dispatch(EditScanActions.cropImage(doc)),

  showColorFilters: () => dispatch(EditScanActions.showColorFilters()),
  hideColorFilters: () => dispatch(EditScanActions.hideColorFilters()),
  selectColorFilter: (doc, page, index) => dispatch(EditScanActions.selectColorFilter(doc, page, index)),

  deletePageRequest: () => dispatch(EditScanActions.deletePageRequest()),
  deletePageDiscard: () => dispatch(EditScanActions.deletePageDiscard()),
  deletePage: (doc) => dispatch(EditScanActions.deletePage(doc)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditScan);
