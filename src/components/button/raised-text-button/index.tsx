import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

import RaisedButton from '../raised-button';
import { styles } from './styles';

// TODO: define types
export default class RaisedTextButton extends PureComponent<any, any> {
  static defaultProps = {
    titleColor: 'rgb(66, 66, 66)',
    disabledTitleColor: 'rgba(0, 0, 0, .26)',
  };

  constructor(props) {
    super(props);

    const {
      disabled,
      disableAnimation = new Animated.Value(disabled ? 1 : 0),
    } = this.props;

    this.state = {
      disableAnimation,
    };
  }

  render() {
    const { disableAnimation } = this.state;
    const {
      title,
      titleColor,
      titleStyle,
      disabledTitleColor,
      ...props
    } = this.props;

    const titleStyleOverrides = {
      color: disableAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [titleColor, disabledTitleColor],
      }),
    };

    return (
      <RaisedButton
        rippleColor={titleColor}
        shadeColor={titleColor}
        {...props}
        disableAnimation={disableAnimation}
      >
        <Animated.Text
          style={[styles.title, titleStyle, titleStyleOverrides]}
          numberOfLines={1}
        >
          {title}
        </Animated.Text>
      </RaisedButton>
    );
  }
}
