import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text, StyleSheet, Easing} from 'react-native';
import {hideToast} from '../../redux/features/toastSlice';
import {useDispatch} from 'react-redux';
type ToastType = 'success' | 'warning' | 'error' | null;

type ToastMessageProps = {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  duration?: number;
};

const ToastMessage: React.FC<ToastMessageProps> = ({
  message,
  isVisible,
  duration = 1000,
  type = 'success',
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(isVisible);
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const animateToast = (
    toValue: number,
    duration: number,
    delay: number = 0,
  ) => {
    return Animated.parallel([
      Animated.timing(translateY, {
        toValue,
        duration,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
        delay,
      }),
      Animated.timing(opacity, {
        toValue: toValue === 0 ? 1 : 0,
        duration: duration / 2,
        useNativeDriver: true,
        delay,
      }),
    ]);
  };

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      animateToast(0, 500).start();

      setTimeout(() => {
        animateToast(-100, 500, duration - 500).start(() => {
          dispatch(hideToast());
          setVisible(false);
        });
      }, duration);
    }
  }, [isVisible, translateY, opacity, duration]);

  const backgroundColor = {
    success: 'green',
    warning: 'orange',
    error: 'red',
  }[type];

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor},
        {transform: [{translateY}], opacity},
      ]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 15,
  },
  text: {
    color: 'white',
  },
});

export default ToastMessage;
