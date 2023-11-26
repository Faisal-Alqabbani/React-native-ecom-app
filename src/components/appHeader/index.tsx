import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import {IMAGE_ASSETS, SVG_ASSETS} from '../imageAsset/assets';
import ImageAsset from '../imageAsset';
import globalStyle from '../../styles/global.style';
import Text from '../text';
import {TextPropsInterface} from '../../utils';
interface IconProps {
  name: keyof typeof SVG_ASSETS | keyof typeof IMAGE_ASSETS;
  onPress: () => void;
  size?: number;
  color?: string;
  bgColor?: string;
  badgeCounter?: number;
}

interface HeaderComponentProps {
  leftIcon?: IconProps;
  rightIcon?: IconProps;
  title?: string;
  backgroundColor?: string;
  statusBarStyle?: 'dark-content' | 'light-content' | 'default' | 'transparent';
  titleStyle?: TextPropsInterface;
}
const HeaderComponent: React.FC<HeaderComponentProps> = ({
  leftIcon,
  rightIcon,
  title,
  backgroundColor = 'transparent',
  statusBarStyle = 'dark-content',
  titleStyle,
}) => {
  return (
    <>
      <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
      <SafeAreaView style={[styles.container, {backgroundColor}]}>
        {leftIcon && (
          <TouchableOpacity onPress={leftIcon.onPress} style={styles.icon}>
            <ImageAsset
              name={leftIcon.name}
              size={leftIcon.size || 20}
              fill={leftIcon.color}
            />
          </TouchableOpacity>
        )}

        {title && (
          <Text size={'25'} weight={'light'} {...titleStyle}>
            {title}
          </Text>
        )}

        {rightIcon && (
          <TouchableOpacity
            onPress={rightIcon.onPress}
            style={[styles.icon, {backgroundColor: rightIcon.bgColor}]}>
            <>
              {!!rightIcon.badgeCounter && (
                <View style={styles.badge}>
                  <Text color={'white'}>{rightIcon.badgeCounter}</Text>
                </View>
              )}
              <ImageAsset
                name={rightIcon.name}
                size={rightIcon.size || 20}
                fill={rightIcon.color}
              />
            </>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
    paddingHorizontal: globalStyle.pagePadding,
    zIndex: 10,
  },
  icon: {
    borderRadius: 200,
    padding: 5, // Adjust for touch area
    margin: 10,
    position: 'relative',
  },
  badge: {
    width: 15,
    height: 15,
    backgroundColor: globalStyle.primaryColor2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
    position: 'absolute',
    left: 8,
    top: -6,
  },
});

export default HeaderComponent;
