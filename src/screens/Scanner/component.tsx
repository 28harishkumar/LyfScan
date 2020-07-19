import React from 'react';
import Scanner from '@src/components/Scanner';
import CustomCrop from 'react-native-perspective-image-cropper';
import { View, Button, Text } from 'react-native';
import Modal from 'react-native-modal';
import { TextButton, RaisedTextButton } from '@src/components/button';
import styles from './styles';

export default class Component extends React.PureComponent<any> {
  /**
   * TODO: add following tabs:
   * Image to Text
   * Business Card
   * Document
   * Handwriting
   * ID Scan
   * Photo
   * Passport Scan
   */
  customCrop = null;

  renderConfirmModal = () => {
    const {
      askScanRejection,
      rejectGoToDocuments,
      forceGoToDocuments,
    } = this.props;

    if (!askScanRejection) { return null; }

    return (
      <Modal isVisible={askScanRejection}>
        <View style={styles.modal}>
          <Text style={styles.modalHead}>Discard this Scan?</Text>
          <View style={styles.modalBody}>
            <Text>If you close now, this scan will be discarded.</Text>
          </View>
          <View style={styles.modalFooter}>
            <View style={styles.row}>
              <RaisedTextButton
                style={styles.fullFlex}
                title='Cancel'
                onPress={rejectGoToDocuments} />

              <TextButton
                style={styles.fullFlex}
                title='Discard'
                onPress={forceGoToDocuments} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const {
      capturedDocument,
      confirmedDocuments,
      onDocumentCapture,
      onDocumentRejected,
      onDocumentAccepted,
      goToDocumentEdit,
      goToDocuments,
    } = this.props;

    if (!capturedDocument) {
      return (
        <View style={styles.fullFlex}>
          {this.renderConfirmModal()}
          <Scanner onDocumentCapture={onDocumentCapture} />
          <View style={styles.row}>
            {
              !!confirmedDocuments &&
              <RaisedTextButton
                style={styles.fullFlex}
                title='Convert to pdf'
                onPress={goToDocumentEdit} />
            }
            <RaisedTextButton
              style={styles.fullFlex}
              title='Show Documents'
              onPress={goToDocuments} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.fullFlex}>
          <View style={styles.fullFlex}>
            <CustomCrop
              ref={ref => (this.customCrop = ref)}
              updateImage={onDocumentAccepted}
              height={200}
              width={200}

              initialImage={capturedDocument.originalUri}
            />
          </View>

          <View style={styles.row}>
            <TextButton
              style={styles.fullFlex}
              title='Retake'
              onPress={() => onDocumentRejected()} />
            <RaisedTextButton
              style={styles.fullFlex}
              title='Continue'
              onPress={() => this.customCrop.crop()} />
          </View>
        </View>
      );
    }
  }
}
