import React from 'react';
import {View} from 'react-native';
import globalStyle from '../../styles/global.style';

// Define an interface for the component props
interface Props {
  isHorizontal?: boolean;
  size?: number;
}

const PageSpace: React.FC<Props> = props => {
  if (props.isHorizontal === true) {
    return (
      <View
        style={{
          width: props.size || globalStyle.pagePadding,
        }}
      />
    );
  } else {
    return (
      <View
        style={{
          height: props.size || globalStyle.pagePadding,
        }}
      />
    );
  }
};

export default PageSpace;
