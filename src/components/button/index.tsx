import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import globalStyle from '../../styles/global.style';
import {Text} from '../index';
import {TextPropsInterface} from '../../utils';
interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  type?: 'primary' | 'secondary';
  textStyle?: TextPropsInterface;
  disabled?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  textStyle,
  disabled,
}) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'primary':
        return [styles.button, styles.primaryButton];
      case 'secondary':
        return [styles.button, styles.secondaryButton];
      default:
        return styles.button;
    }
  };

  return (
    <TouchableOpacity
      testID={'component_button'}
      onPress={onPress}
      style={getButtonStyle()}
      disabled={disabled}>
      <Text
        testID={'button_title'}
        color={'white'}
        size={'25'}
        weight={'light'}
        {...textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  primaryButton: {
    backgroundColor: globalStyle.primaryColor1, // Replace with your primary color
    borderColor: globalStyle.primaryColor1,
  },
  secondaryButton: {
    backgroundColor: globalStyle.primaryColor2,
    borderColor: globalStyle.primaryColor2, // Replace with the secondary border color if different
  },
  text: {
    color: 'white', // Text color for primary button
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomButton;
