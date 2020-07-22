import React from 'react';
import { connect } from 'react-redux';
import {
  saveDocument,
} from '@src/actions/editScan';
import { SavedDocumentProps } from '@src/types/doc';

import { Component } from './component';
import { BackHandler } from 'react-native';
import { EditScanState } from '@src/types/screens/editScan';

type Props = EditScanState & {
  pdfDocument: SavedDocumentProps;
  saveDocument: (pdfDocument: SavedDocumentProps) => void;
  navigation: any;
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
    // TODO: if modification active then alert else to documents

    this.props.navigation.reset({
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
        pdfDocument={this.props.pdfDocument}
        onSave={this.onSave}
      />
    );
  }
}

const mapStateToProps = state => state.editScan;

const mapDispatchToProps = dispatch => ({
  saveDocument: (pdfDocument: SavedDocumentProps) => dispatch(saveDocument(pdfDocument)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditScan);
