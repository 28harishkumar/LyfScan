import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

import Button from '../button';
import { styles } from './styles';

// TODO: types for Props and State
export default class TextButton extends PureComponent<any, any> {
  static defaultProps = {
    color: 'transparent',
    disabledColor: 'transparent',

    titleColor: 'rgb(0, 0, 0)',
    disabledTitleColor: 'rgba(0, 0, 0, .26)',

    shadeOpacity: 0.20,
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
      style,
      ...props
    } = this.props;

    const titleStyleOverrides = {
      color: disableAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [titleColor, disabledTitleColor],
      }),
    };

    return (
      <Button
        style={[styles.container, style]}
        shadeColor={titleColor}
        rippleColor={titleColor}
        {...props}
        disableAnimation={disableAnimation}
      >
        <Animated.Text
          style={[styles.title, titleStyle, titleStyleOverrides]}
          numberOfLines={1}
        >
          {title}
        </Animated.Text>
      </Button>
    );
  }
}
