import React from 'react';
import {ActivityIndicator, View, ActivityIndicatorProps} from 'react-native';
import globalStyle from '../../styles/global.style';

interface CustomActiveIndicatorProps {
  size?: ActivityIndicatorProps['size']; // using the type defined in ActivityIndicatorProps
}

const CustomActiveIndicator: React.FC<CustomActiveIndicatorProps> = ({
  size = 'large',
}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={size} color={globalStyle.primaryColor1} />
    </View>
  );
};

export default CustomActiveIndicator;
