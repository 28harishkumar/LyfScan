/**
 * Scanner widget
 *
 */

import React from 'react';

import {
  FlatList,
  View,
  Platform,
  Image,
  Text,
} from 'react-native';
import Permissions from 'react-native-permissions';
import ScannerComponent from '@28harishkumar/react-native-scanner';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import Ripple from '@src/components/ripple';
import colors from '@src/core/colors';
import { ScannedDocumentProps } from '@src/types/doc';
import { ScannerTabs } from '@src/core/constants';
import styles from './styles';
import { FlashProps } from '@src/types/screens/scanner';

type Props = {
  confirmedDocuments: ScannedDocumentProps[];
  useFlash: FlashProps;
  autoCapture: boolean;
  activeTab: number;
  onFlashChange: (value: string) => void;
  onAutoCaptureChange: (value: boolean) => void;
  goToScanEdit: () => void;
  onDocumentCapture: (data: any) => void;
};

type State = {
  allowed: boolean;
};

function RenderScanner(props) {
  const { onDocumentCapture, useFlash, autoCapture, onRef } = props;
  const isFocused = useIsFocused();

  if (!isFocused) { return null; }

  return (
    <ScannerComponent
      ref={onRef}
      style={styles.scanner}
      quality={0.5}
      onPictureTaken={onDocumentCapture}
      saveOnDevice={true}
      overlayColor='rgba(255,130,0, 0.7)'
      enableTorch={useFlash === 'on'}
      manualOnly={!autoCapture}
      detectionCountBeforeCapture={10}
      detectionRefreshRateInMS={200}
    />
  );
}

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

  onRef = (r) => { this.pdfScannerElement = r; };

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

  render() {
    return (
      <React.Fragment>
        <View style={[styles.fullFlex, { backgroundColor: '#000' }]}>
          {
            this.state.allowed &&
            <RenderScanner
              onDocumentCapture={this.props.onDocumentCapture}
              useFlash={this.props.useFlash}
              autoCapture={this.props.autoCapture}
              onRef={this.onRef}
            />
          }
        </View>
        {this.renderTabs()}
        {this.renderActions()}
      </React.Fragment>
    );
  }
}
