import React from 'react';
import {View, ScrollView, ViewStyle} from 'react-native';
import style from './style';
import globalStyle from '../../styles/global.style';

interface PageContainerProps {
  withScroll?: boolean;
  withPadding?: boolean;
  bgColor?: string;
  withBottomPadding?: boolean;
  keyboardShouldPersistTaps?: string;
  onLayout?: () => void;
  style?: ViewStyle;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = props => {
  const getMainStyles = (): ViewStyle[] => {
    return [
      style.container,
      {
        paddingHorizontal:
          props.withPadding === true ? globalStyle.pagePadding : 0,
      },
      {backgroundColor: props.bgColor},
    ];
  };

  if (props.withScroll === true) {
    return (
      <ScrollView
        onLayout={props.onLayout}
        contentContainerStyle={[...getMainStyles(), {flex: 0}, props.style]}
        keyboardShouldPersistTaps="handled">
        {props.children}
      </ScrollView>
    );
  } else {
    return (
      <View
        onLayout={props.onLayout}
        style={[
          ...getMainStyles(),
          props.withBottomPadding === false ? undefined : {paddingBottom: 15},
          props.style,
        ].filter(Boolean)} // This filters out any undefined or null values
      >
        {props.children}
      </View>
    );
  }
};

PageContainer.defaultProps = {
  withScroll: false,
  withPadding: true,
  bgColor: globalStyle.bgColor1,
  withBottomPadding: true,
};

export default PageContainer;
