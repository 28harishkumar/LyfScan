/**
 * Scanner widget
 *
 */

import React, {
  useRef,
  useState,
  useEffect,
} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Permissions from 'react-native-permissions';
import ScannerComponent from '@28harishkumar/react-native-scanner';

export default function Scanner(props) {
  const pdfScannerElement = useRef(null);
  const [data, setData]: any = useState();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function requestCamera() {
      const result = await Permissions.request(
        Platform.OS === 'android' ? 'android.permission.CAMERA' : 'ios.permission.CAMERA',
      );

      if (result === 'granted') { setAllowed(true); }
    }

    requestCamera();
  }, []);

  function handleOnPressRetry() {
    setData({});
  }

  function handleOnPress() {
    pdfScannerElement.current.capture();
  }

  if (data && data.croppedImage) {
    return (
      <React.Fragment>
        <Image source={{ uri: data.croppedImage }} style={styles.preview} />
        <TouchableOpacity onPress={handleOnPressRetry} style={styles.button}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ScannerComponent
        ref={pdfScannerElement}
        style={styles.scanner}
        onPictureTaken={props.onDocumentCapture}
        overlayColor='rgba(255,130,0, 0.7)'
        enableTorch={props.useFlash}
        quality={0.5}
        detectionCountBeforeCapture={5}
        detectionRefreshRateInMS={50}
      />
      <TouchableOpacity onPress={handleOnPress} style={styles.button}>
        <Text style={styles.buttonText}>Take picture</Text>
      </TouchableOpacity>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    aspectRatio: undefined,
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 32,
  },
  buttonText: {
    backgroundColor: 'rgba(245, 252, 255, 0.7)',
    fontSize: 32,
  },
  preview: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  permissions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});