import React, {useMemo} from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';
import {IMAGE_ASSETS, SVG_ASSETS} from './assets';

interface ImageAssetProps {
  name: keyof typeof SVG_ASSETS | keyof typeof IMAGE_ASSETS;
  size?: number;
  style?: StyleProp<ImageStyle>;
  fill?: string;
}

const ImageAsset: React.FC<ImageAssetProps> = React.memo(
  ({name, size = 30, style, fill}) => {
    const SvgAsset = SVG_ASSETS[name as keyof typeof SVG_ASSETS];
    const img = IMAGE_ASSETS[name as keyof typeof IMAGE_ASSETS];

    return useMemo(() => {
      if (SvgAsset) {
        return (
          <SvgAsset width={size} height={size} style={style} fill={fill} />
        );
      }

      if (img) {
        return (
          <Image source={img} style={[{width: size, height: size}, style]} />
        );
      }

      return null;
    }, [SvgAsset, img, size, style, fill]);
  },
);

export default ImageAsset;
