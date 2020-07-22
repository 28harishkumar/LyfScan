import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import CustomCrop from 'react-native-perspective-image-cropper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextButton, RaisedTextButton } from '@src/components/button';
import colors from '@src/core/colors';
import Ripple from '@src/components/ripple';
import { ScannedDocumentProps } from '@src/types/doc';
import { FlashProps } from '@src/types/screens/scanner';
import Scanner from './Scanner';
import styles from './styles';

// TODO: types for Props
type Props = any & {
  activeTab: number;
  useFlash: FlashProps;
  popupConfirmed: boolean;
  autoCapture: boolean;
  askScanRejection: boolean;
  capturedDocument: ScannedDocumentProps;
  confirmedDocuments: ScannedDocumentProps[];
  onDocumentCapture: (data) => void;
  onDocumentRejected: () => void;
  onDocumentAccepted: (image, url, coordinates) => void;
  rejectGoToDocuments: () => void;
  forceGoToDocuments: () => void;
  goToScanEdit: () => void;
  goToDocuments: () => void;
};

export default class Component extends React.PureComponent<Props> {
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

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Ripple
          style={{ flex: 0, width: 100 }}
          delayPressOut={200}
          onLongPress={this.props.goToDocuments}
          onPress={this.props.goToDocuments}>
          <MaterialIcons
            name='home'
            size={34}
            style={styles.homeIcon}
            color={colors.secondaryIcon} />
        </Ripple>
        <TextButton
          titleColor={colors.secondaryText}
          style={styles.tourBtn}
          title='Take Tour' />
      </View>
    );
  }

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
                title='No'
                onPress={rejectGoToDocuments} />

              <TextButton
                style={styles.fullFlex}
                titleColor={colors.danger}
                title='Yes'
                onPress={forceGoToDocuments} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderScannerView() {
    const {
      confirmedDocuments,
      onDocumentCapture,
      goToScanEdit,
      goToDocuments,
    } = this.props;

    return (
      <React.Fragment>
        {this.renderConfirmModal()}
        {this.renderHeader()}
        <Scanner
          activeTab={this.props.activeTab}
          useFlash={this.props.useFlash}
          onFlashChange={this.props.onFlashChange}
          autoCapture={this.props.autoCapture}
          onAutoCaptureChange={this.props.onAutoCaptureChange}
          confirmedDocuments={confirmedDocuments}
          onDocumentCapture={onDocumentCapture}
          goToScanEdit={goToScanEdit}
          goToDocuments={goToDocuments}
        />
      </React.Fragment>
    );
  }

  renderCroppingView() {
    const {
      capturedDocument,
      onDocumentRejected,
      onDocumentAccepted,
    } = this.props;

    return (
      <View style={styles.fullFlex}>
        <View style={styles.fullFlex}>
          <CustomCrop
            ref={ref => (this.customCrop = ref)}
            updateImage={onDocumentAccepted}
            height={capturedDocument.height - 200}
            width={capturedDocument.width}

            initialImage={capturedDocument.originalUri}
            rectangleCoordinates={capturedDocument.croppedPosition}
          />
        </View>
        <View style={styles.cropActionWrap}>
          <Text style={styles.cropNote}>Adjest the edges. You can re-crop anytime.</Text>
          <View style={styles.cropBtnWrap}>
            <TextButton
              style={styles.retakeBtn}
              titleStyle={styles.cropBtnText}
              titleColor={colors.secondaryText}
              title='Retake'
              onPress={() => onDocumentRejected()} />
            <RaisedTextButton
              style={styles.confirmBtn}
              title='Continue'
              titleStyle={styles.cropBtnText}
              titleColor={colors.secondaryText}
              onPress={() => this.customCrop.crop()} />
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { capturedDocument } = this.props;

    if (capturedDocument) {
      return this.renderCroppingView();
    }

    return this.renderScannerView();
  }
}
