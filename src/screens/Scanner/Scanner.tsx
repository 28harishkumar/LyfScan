/**
 * Scanner widget
 *
 */

import React from 'react';

import {
  View,
  Platform,
  Image,
  Text,
} from 'react-native';
import Permissions from 'react-native-permissions';
import ScannerComponent from '@28harishkumar/react-native-scanner';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ripple from '@src/components/ripple';
import colors from '@src/core/colors';
import { ScannedDocumentProps } from '@src/types/doc';
import styles from './styles';

// TODO:
type Props = any & {
  confirmedDocuments: ScannedDocumentProps;
};

type State = {
  allowed: boolean;
};

export default class Scanner extends React.PureComponent<Props, State> {
  state: State = {
    allowed: false,
  };

  pdfScannerElement = null;

  async componentDidMount() {
    const result = await Permissions.request(
      Platform.OS === 'android' ? 'android.permission.CAMERA' : 'ios.permission.CAMERA',
    );

    if (result === 'granted') { this.setState({ allowed: true }); }
  }

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

    // if (useFlash === 'auto') {
    //   return onFlashChange('on');
    // }
  }

  handleDocumentPress = () => {
    this.props.goToScanEdit();
  }

  renderTabs = () => {

  }

  renderActions = () => {
    const {
      useFlash,
      autoCapture,
      confirmedDocuments,
    } = this.props;
    let uri = null;

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

  render() {
    return (
      <React.Fragment>
        <View style={styles.fullFlex}>
          {
            this.state.allowed && (
              <ScannerComponent
                ref={r => {this.pdfScannerElement = r; }}
                style={styles.scanner}
                quality={0.5}
                onPictureTaken={this.props.onDocumentCapture}
                overlayColor='rgba(255,130,0, 0.7)'
                enableTorch={this.props.useFlash === 'on'}
                manualOnly={!this.props.autoCapture}
                detectionCountBeforeCapture={5}
                detectionRefreshRateInMS={200}
              />
            )
          }
        </View>
        {this.renderTabs()}
        {this.renderActions()}
      </React.Fragment>
    );
  }
}
