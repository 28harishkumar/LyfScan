import React, { PureComponent } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Easing,
  Platform,
  TouchableWithoutFeedback,
  I18nManager,
  ViewProps,
  TouchableOpacityProps,
} from 'react-native';

const radius = 10;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: 'transparent',
    overflow: 'hidden',
  },

  ripple: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    overflow: 'hidden',
    position: 'absolute',
  },
});

type Props = ViewProps & TouchableOpacityProps & {
  onLayout?: (e) => void;
  onPress?: (e) => void;
  onLongPress?: (e) => void;
  rippleColor?: string;
  rippleOpacity?: number;
  rippleDuration?: number;
  rippleSize?: number;
  rippleContainerBorderRadius?: number;
  rippleCentered?: boolean;
  rippleSequential?: boolean;
  rippleFades?: boolean;
  disabled?: boolean;

  onRippleAnimation?: (animation, callback) => void;
};

type State = {
  width: number;
  height: number;
  ripples: any[];
};


export default class Ripple extends PureComponent<Props, State> {
  static defaultProps = {
    rippleColor: 'rgb(0, 0, 0)',
    rippleOpacity: 0.30,
    rippleDuration: 400,
    rippleSize: 0,
    rippleContainerBorderRadius: 0,
    rippleCentered: false,
    rippleSequential: false,
    rippleFades: true,
    disabled: false,

    onRippleAnimation: (animation, callback) => animation.start(callback),
  };

  unique = 0;
  mounted = false;

  constructor(props) {
    super(props);

    this.onLayout = this.onLayout.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);

    this.renderRipple = this.renderRipple.bind(this);

    this.state = {
      width: 0,
      height: 0,
      ripples: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onLayout(event) {
    const { width, height } = event.nativeEvent.layout;
    const { onLayout } = this.props;

    if ('function' === typeof onLayout) {
      onLayout(event);
    }

    this.setState({ width, height });
  }

  onPress(event) {
    const { ripples } = this.state;
    const { onPress, rippleSequential } = this.props;

    if (!rippleSequential || !ripples.length) {
      if ('function' === typeof onPress) {
        requestAnimationFrame(() => onPress(event));
      }

      this.startRipple(event);
    }
  }

  onLongPress(event) {
    const { onLongPress } = this.props;

    if ('function' === typeof onLongPress) {
      requestAnimationFrame(() => onLongPress(event));
    }

    this.startRipple(event);
  }

  onPressIn(event) {
    const { onPressIn } = this.props;

    if ('function' === typeof onPressIn) {
      onPressIn(event);
    }
  }

  onPressOut(event) {
    const { onPressOut } = this.props;

    if ('function' === typeof onPressOut) {
      onPressOut(event);
    }
  }

  onAnimationEnd() {
    if (this.mounted) {
      this.setState(({ ripples }) => ({ ripples: ripples.slice(1) }));
    }
  }

  startRipple(event) {
    const { width, height } = this.state;
    const {
      rippleDuration,
      rippleCentered,
      rippleSize,
      onRippleAnimation,
    } = this.props;

    const w2 = 0.5 * width;
    const h2 = 0.5 * height;

    const { locationX, locationY } = rippleCentered ?
      { locationX: w2, locationY: h2 } :
      event.nativeEvent;

    const offsetX = Math.abs(w2 - locationX);
    const offsetY = Math.abs(h2 - locationY);

    const R = rippleSize > 0 ?
      0.5 * rippleSize :
      Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2));

    const ripple = {
      unique: this.unique++,
      progress: new Animated.Value(0),
      locationX,
      locationY,
      R,
    };

    const animation = Animated
      .timing(ripple.progress, {
        toValue: 1,
        easing: Easing.out(Easing.ease),
        duration: rippleDuration,
        useNativeDriver: false,
      });

    onRippleAnimation(animation, this.onAnimationEnd);

    this.setState(({ ripples }) => ({ ripples: ripples.concat(ripple) }));
  }

  renderRipple({ unique, progress, locationX, locationY, R }) {
    const { rippleColor, rippleOpacity, rippleFades } = this.props;

    const rippleStyle = {
      top: locationY - radius,
      [I18nManager.isRTL ? 'right' : 'left']: locationX - radius,
      backgroundColor: rippleColor,

      transform: [{
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5 / radius, R / radius],
        }),
      }],

      opacity: rippleFades ?
        progress.interpolate({
          inputRange: [0, 1],
          outputRange: [rippleOpacity, 0],
        }) :
        rippleOpacity,
    };

    return (
      <Animated.View style={[styles.ripple, rippleStyle]} key={unique} />
    );
  }

  render() {
    const { ripples } = this.state;
    const {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      children,
      rippleContainerBorderRadius,
      testID,
      nativeID,
      accessible,
      accessibilityHint,
      accessibilityLabel,

      onPress,
      onLongPress,
      onLayout,
      onRippleAnimation,

      rippleColor,
      rippleOpacity,
      rippleDuration,
      rippleSize,
      rippleCentered,
      rippleSequential,
      rippleFades,

      ...props
    } = this.props;

    const touchableProps = {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      testID,
      accessible,
      accessibilityHint,
      accessibilityLabel,
      onLayout: this.onLayout,
      onPress: this.onPress,
      onPressIn: this.onPressIn,
      onPressOut: this.onPressOut,
      onLongPress: onLongPress ? this.onLongPress : undefined,
      ...('web' !== Platform.OS ? { nativeID } : null),
    };

    const containerStyle = {
      borderRadius: rippleContainerBorderRadius,
    };

    return (
      <TouchableWithoutFeedback {...touchableProps}>
        <Animated.View {...props} pointerEvents='box-only'>
          {children}
          <View style={[styles.container, containerStyle]}>
            {ripples.map(this.renderRipple)}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
