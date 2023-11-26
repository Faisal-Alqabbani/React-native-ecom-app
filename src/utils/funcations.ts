// src/utils/functions.ts
import {Dimensions} from 'react-native';
import {BASE_SCREEN_WIDTH, MAX_FONT_SIZE, MIN_FONT_SIZE} from './constants';

export function responsiveFontSize(baseSize: number): number {
  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  const scale: number = SCREEN_WIDTH / BASE_SCREEN_WIDTH;
  const scaledSize: number = baseSize * scale;
  const newSize: number = Math.min(
    Math.max(scaledSize, MIN_FONT_SIZE),
    MAX_FONT_SIZE,
  );

  return Math.round(newSize);
}
