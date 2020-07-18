import React from 'react';
import Scanner from '@src/components/Scanner';


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
    return (
      <Scanner />
    )
  }
}