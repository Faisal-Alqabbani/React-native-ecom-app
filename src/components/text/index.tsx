import React, {FC} from 'react';
import {Text as MyText, TextStyle, StyleSheet} from 'react-native';
import globalStyle from '../../styles/global.style';
import {responsiveFontSize, TextPropsInterface} from '../../utils';

const Text: FC<TextPropsInterface> = ({
  size = '10',
  weight = 'regular',
  align = 'left',
  color = globalStyle.primaryColor1,
  style,
  children,
  ...rest
}) => {
  const fontWeight = (): TextStyle => {
    switch (weight) {
      case 'light':
        return styles.light;
      case 'bold':
        return styles.bold;
      default:
        return styles.regular;
    }
  };

  const textAlignment = (): TextStyle => ({
    textAlign: align,
  });

  const textSize = (): number => {
    return Number(size) - 10;
  };

  return (
    <MyText
      allowFontScaling={false}
      {...rest}
      style={[
        textAlignment(),
        styles.fontFamily,
        {color},
        fontWeight(),
        {fontSize: responsiveFontSize(textSize())},
        style,
      ]}>
      {children}
    </MyText>
  );
};

const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: 'Comfortaa , sans-serif',
  },
  bold: {
    fontWeight: '600',
  },
  regular: {
    fontWeight: '500',
  },
  light: {
    fontWeight: '400',
  },
});

export default Text;
