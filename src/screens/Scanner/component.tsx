import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import CustomCrop from 'react-native-perspective-image-cropper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextButton, RaisedTextButton } from '@src/components/button';
import colors from '@src/core/colors';
import { ScannedDocumentProps } from '@src/types/doc';
import { FlashProps } from '@src/types/screens/scanner';
import Scanner from './Scanner';
import styles from './styles';
import Ripple from '@src/components/ripple';
import { ScannerTabs } from '@src/core/constants';

type Props = {
  activeTab: number;
  useFlash: FlashProps;
  popupConfirmed: boolean;
  autoCapture: boolean;
  askScanRejection: boolean;
  showDocumentPreview: boolean;
  capturedDocument: ScannedDocumentProps;
  confirmedDocuments: ScannedDocumentProps[];
  ocrLanguage: string;
  showOCRLanguageList: boolean;

  onDocumentCapture: (data) => void;
  onDocumentRejected: () => void;
  onDocumentAccepted: (image, url, coordinates) => void;
  rejectGoToDocuments: () => void;
  forceGoToDocuments: () => void;
  onFlashChange: (useFlash: FlashProps) => void;
  onAutoCaptureChange: (autoCapture: boolean) => void;
  goToScanEdit: () => void;
  goToDocuments: () => void;

  onTabChange: (activeTab: number) => void;
  onPopupConfirmed: () => void;
  onOCRLanguageRequest: () => void;
  onOCRLanguageChange: (language: string) => void;
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
  pdfScannerElement = null;

  onScannerRef = (r) => { this.pdfScannerElement = r; };

  capture = () => {
    this.pdfScannerElement.capture();
  }

  openGallery = () => {
    // TODO:
  }

  toggleAutoCapture = () => {
    this.props.onAutoCaptureChange(!this.props.autoCapture);
  }

  toggleFlash = () => {
    const { useFlash, onFlashChange } = this.props;

    if (useFlash === 'on') {
      return onFlashChange('off');
    }

    if (useFlash === 'off') {
      return onFlashChange('on');
    }

    // TODO: auto is not accepted by NativeModule
    // if (useFlash === 'auto') {
    //   return onFlashChange('on');
    // }
  }

  handleDocumentPress = () => {
    this.props.goToScanEdit();
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={{ width: 100 }}
          onPress={this.props.goToDocuments}>
          <MaterialIcons
            name='home'
            size={34}
            style={styles.homeIcon}
            color={colors.secondaryIcon} />
        </TouchableOpacity>
        <TextButton
          titleColor={colors.secondaryText}
          style={styles.tourBtn}
          title='Take a Tour' />
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

  renderScannerTab = ({ item: tab, index }) => {
    const { activeTab } = this.props;
    const isActiveTab = activeTab === index;
    const {
      tabText,
      activeTabText,
    } = styles;

    const textStyle = isActiveTab ? activeTabText : tabText;
    return (
      <Ripple>
        <View style={styles.tabView}>
          <Text style={textStyle}>{tab.name}</Text>
          {isActiveTab && <View style={styles.activeTabBorder}></View>}
        </View>
      </Ripple>
    );
  }

  renderTabs = () => {
    return (
      <View style={styles.tabList}>
        <FlatList
          horizontal={true}
          data={ScannerTabs}
          renderItem={this.renderScannerTab}
          keyExtractor={item => item.name}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabListContainer}
        />
      </View>
    );
  }

  renderActions = () => {
    let uri = null;
    const {
      useFlash,
      autoCapture,
      confirmedDocuments,
    } = this.props;

    if (confirmedDocuments) {
      uri = confirmedDocuments[0].originalUri;
    }

    return (
      <View style={styles.footer}>
        <Ripple
          onPress={this.openGallery}>
          <MaterialIcons
            name='photo-library'
            style={styles.actionIcon}
            color={colors.primaryIcon}
            size={32} />
        </Ripple>
        <Ripple
          onPress={this.toggleAutoCapture}>
          <MaterialIcons
            name='camera'
            style={[
              styles.actionIcon,
              !autoCapture && styles.captureOffIcon,
            ]}
            color={colors.primaryIcon}
            size={32} />
          {
            !autoCapture && <Text style={styles.captureOffText}>x</Text>
          }
        </Ripple>
        <Ripple
          style={styles.captureBtn}
          onPress={this.capture}>
          <MaterialIcons
            name='camera-alt'
            color={colors.secondaryIcon} size={32} />
        </Ripple>
        <Ripple
          onPress={this.toggleFlash}>
          <MaterialIcons
            style={styles.actionIcon}
            name={`flash-${useFlash}`}
            color={colors.primaryIcon}
            size={32} />
        </Ripple>
        <Ripple
          onPress={this.handleDocumentPress}>
          {
            !!uri ?
              <Image
                style={styles.imageDim}
                source={{ uri }} /> :
              <View style={styles.imageDim}></View>
          }
        </Ripple>
      </View>
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
          confirmedDocuments={this.props.confirmedDocuments}
          useFlash={this.props.useFlash}
          autoCapture={this.props.autoCapture}
          onScannerRef={this.onScannerRef}
          onDocumentCapture={onDocumentCapture}
        />
        {this.renderTabs()}
        {this.renderActions()}
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
            height={capturedDocument.height}
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
