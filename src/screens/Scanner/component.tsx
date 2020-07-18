import React from 'react';
import Scanner from '@src/components/Scanner';
import CustomCrop from 'react-native-perspective-image-cropper';


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
  render() {
    const { capturedDocument, onDocumentCapture } = this.props;

    if (!capturedDocument) {
      return (
        <Scanner onDocumentCapture={onDocumentCapture} />
      )
    } else {
      return <CustomCrop
        updateImage={console.log}
        height={200}
        width	={200}
        
        initialImage={capturedDocument.initialImage}
       />
    }
  }
}