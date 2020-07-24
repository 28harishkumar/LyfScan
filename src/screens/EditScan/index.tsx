import React from 'react';
import { connect } from 'react-redux';
import * as EditScanActions from '@src/actions/editScan';
import { SavedDocumentProps } from '@src/types/doc';

import { Component } from './component';
import { BackHandler } from 'react-native';
import { EditScanState } from '@src/types/screens/editScan';
import { refreshDocuments } from '@src/actions/documentList';

type Props = EditScanState & {
  navigation: any;
  dispatch: (e) => void;
  pdfDocument: SavedDocumentProps;
  setActivePage: (index: number) => void;
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
    const {
      dispatch,
      navigation,
      pdfDocument,
      documentModified,
    } = this.props;

    if (documentModified) {
      // TODO: if modification active then alert else to documents
    }

    dispatch(refreshDocuments(pdfDocument.folderId));
    navigation.reset({
      index: 0,
      routes: [{ name: 'DocumentList' }],
    });
    return true;
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

  render() {
    return (
      <Component
        activePage={this.props.activePage}
        showNameChangeForm={this.props.showNameChangeForm}
        pdfDocument={this.props.pdfDocument}
        onSave={this.onSave}
        setActivePage={this.props.setActivePage}
        onCancel={this.handleBackButtonClick}
      />
    );
  }
}

const mapStateToProps = state => state.editScan;

const mapDispatchToProps = dispatch => ({
  saveDocument: (pdfDocument: SavedDocumentProps) => dispatch(EditScanActions.saveDocument(pdfDocument)),
  setActivePage: (index: number) => dispatch(EditScanActions.onSwap(index)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditScan);
