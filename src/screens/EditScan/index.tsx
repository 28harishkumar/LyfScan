import React from 'react';
import { connect } from 'react-redux';
import {
  saveDocument,
} from '@src/actions/editScan';
import { SavedDocumentProps } from '@src/types/doc';

import { Component } from './component';

type Props = {
  pdfDocument: SavedDocumentProps;
  saveDocument: (pdfDocument: SavedDocumentProps) => void;
  navigation: any;
};

class EditScan extends React.PureComponent<Props> {
  onSave = () => {
    const {
      saveDocument: saveScannedDocument,
      pdfDocument,
    } = this.props;

    saveScannedDocument(pdfDocument);
    this.props.navigation.navigate('DocumentList');
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
