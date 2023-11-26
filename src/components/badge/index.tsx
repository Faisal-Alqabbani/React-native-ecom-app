import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import globalStyle from '../../styles/global.style';
import {Text} from '../index';
import {TextPropsInterface} from '../../utils';
interface BadgeProps {
  text: string;
  extraStyle?: ViewStyle;
  size?: 'big' | 'medium' | 'small';
  textStyle?: TextPropsInterface;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  extraStyle,
  size = 'medium',
  textStyle,
}) => {
  const sizeStyle = styles[size] || styles.medium;
  return (
    <View style={[sizeStyle, extraStyle]}>
      <Text color={'white'} {...textStyle}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  big: {
    width: 170,
    padding: 30,
    bottom: 5,
    left: 0,
    color: '#FFFFFF',
    backgroundColor: globalStyle.primaryColor1,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  medium: {
    width: 100,
    padding: 15,
    position: 'absolute',
    bottom: 5,
    left: 0,
    backgroundColor: globalStyle.primaryColor1,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  small: {
    width: 80,
    padding: 10,
  },
});

export default Badge;
