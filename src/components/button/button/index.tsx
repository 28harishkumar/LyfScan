import React, { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';
import Ripple from '@src/components/ripple';

import { styles } from './styles';

// TODO: define types
export default class Button extends PureComponent<any, any> {
  static defaultProps = {
    rippleContainerBorderRadius: 2,
    rippleSequential: true,

    hitSlop: { top: 6, right: 4, bottom: 6, left: 4 },

    color: 'rgb(224, 224, 224)',
    disabledColor: 'rgb(240, 240, 240)',

    shadeColor: 'rgb(0, 0, 0)',
    shadeOpacity: 0.12,
    shadeBorderRadius: 2,

    focusAnimationDuration: 225,
    disableAnimationDuration: 225,

    disabled: false,
  };

  onPressIn: (e) => void;
  onPressOut: (e) => void;

  constructor(props) {
    super(props);

    this.onPressIn = this.onFocusChange.bind(this, true);
    this.onPressOut = this.onFocusChange.bind(this, false);

    const {
      disabled,
      focusAnimation = new Animated.Value(0),
      disableAnimation = new Animated.Value(disabled ? 1 : 0),
    } = this.props;

    this.state = {
      focusAnimation,
      disableAnimation,
    };
  }

  componentDidUpdate(prevProps) {
    const { disabled } = this.props;

    if (disabled ^ prevProps.disabled) {
      const { disableAnimationDuration: duration } = this.props;
      const { disableAnimation } = this.state;

      Animated
        .timing(
          disableAnimation,
          {
            toValue: disabled ? 1 : 0,
            duration,
            useNativeDriver: false,
          })
        .start();
    }
  }

  onPress = () => {
    const { onPress, payload } = this.props;

    if ('function' === typeof onPress) {
      onPress(payload);
    }
  }

  onFocusChange = (focused) => {
    const { focusAnimation } = this.state;
    const { focusAnimationDuration } = this.props;

    Animated
      .timing(focusAnimation, {
        toValue: focused ? 1 : 0,
        duration: focusAnimationDuration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      })
      .start();
  }

  render() {
    const { focusAnimation, disableAnimation } = this.state;
    const {
      color,
      disabledColor,
      shadeColor,
      shadeOpacity,
      shadeBorderRadius,
      style,
      children,
      ...props
    } = this.props;

    const rippleStyle = {
      backgroundColor: disableAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [color, disabledColor],
      }),
    };

    const shadeContainerStyle = {
      borderRadius: shadeBorderRadius,
    };

    const shadeStyle = {
      backgroundColor: shadeColor,
      opacity: focusAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, shadeOpacity],
      }),
    };

    return (
      <Ripple
        {...props}

        style={[styles.container, rippleStyle, style]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        {children}

        <View style={[styles.shadeContainer, shadeContainerStyle]}>
          <Animated.View style={[styles.shade, shadeStyle]} />
        </View>
      </Ripple>
    );
  }
}
