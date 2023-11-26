import {TextStyle} from 'react-native';
import {ReactNode} from 'react';

export interface TextPropsInterface {
  size?:
    | '46'
    | '42'
    | '24'
    | '20'
    | '18'
    | '16'
    | '14'
    | '12'
    | '10'
    | '25'
    | '60';
  weight?: 'bold' | 'light' | 'regular';
  align?: 'center' | 'left' | 'right';
  color?: string;
  numberOfLines?: number;
  style?: TextStyle | TextStyle[];
  children?: ReactNode;
  testID?: string;
}
