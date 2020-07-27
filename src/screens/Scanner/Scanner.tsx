/**
 * Scanner widget
 *
 */

import React from 'react';

import {
  View,
  Platform,
} from 'react-native';
import Permissions from 'react-native-permissions';
import ScannerComponent, { PictureTaken } from '@28harishkumar/react-native-scanner';
import { useIsFocused } from '@react-navigation/native';
import { ScannedDocumentProps } from '@src/types/doc';
import styles from './styles';
import { FlashProps } from '@src/types/screens/scanner';

type Props = {
  confirmedDocuments: ScannedDocumentProps[];
  useFlash: FlashProps;
  autoCapture: boolean;
  activeTab: number;
  onScannerRef: (r) => void;
  onDocumentCapture: (data: PictureTaken) => void;
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
      key={autoCapture.toString()}
      style={styles.scanner}
      quality={1}
      onPictureTaken={onDocumentCapture}
      overlayColor='rgba(255,130,0, 0.7)'
      enableTorch={useFlash === 'on'}
      manualOnly={!autoCapture}
      saveOnDevice={true}
      detectionCountBeforeCapture={15}
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
              onRef={this.props.onScannerRef}
            />
          }
        </View>
      </React.Fragment>
    );
  }
}
