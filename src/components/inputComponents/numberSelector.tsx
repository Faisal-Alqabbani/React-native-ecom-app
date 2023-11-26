import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Text from '../text';
import globalStyle from '../../styles/global.style';
// Props interface
interface NumberSelectorProps {
  initialNumber?: number;
  minNumber?: number;
  maxNumber?: number;
  backgroundColor?: string;
  onValueChange?: (newValue: number) => void;
  style?: StyleProp<ViewStyle>;
}

const NumberSelector: React.FC<NumberSelectorProps> = ({
  initialNumber = 1,
  minNumber = 0,
  maxNumber = Infinity,
  backgroundColor = globalStyle.primaryColor3,
  onValueChange,
  style,
}) => {
  const [number, setNumber] = useState(initialNumber);

  const increment = () => {
    const newValue = number + 1;
    if (newValue <= maxNumber) {
      setNumber(newValue);
      onValueChange?.(newValue);
    }
  };

  const decrement = () => {
    const newValue = Math.max(number - 1, minNumber);
    if (newValue >= minNumber) {
      setNumber(newValue);
      onValueChange?.(newValue);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor}, style]}>
      <TouchableOpacity onPress={decrement} style={styles.button}>
        <Text color={globalStyle.solid_white} size={'25'}>
          {'<'}
        </Text>
      </TouchableOpacity>
      <Text
        color={globalStyle.solid_white}
        size={'25'}
        testID={'test_number_inc_dec'}>
        {number}
      </Text>
      <TouchableOpacity onPress={increment} style={styles.button}>
        <Text color={globalStyle.solid_white} size={'25'}>
          {'>'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
  },
  button: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
  number: {
    fontSize: 18,
    color: '#000',
    marginHorizontal: 5,
  },
});

export default NumberSelector;
