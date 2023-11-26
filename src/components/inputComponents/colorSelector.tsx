import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface ColorSelectorProps {
  colors: string[];
  onSelect: (color: string) => void;
  selectedColor?: string;
  style?: StyleProp<ViewStyle>;
  innerBorderColor?: string;
  outerBorderColor?: string;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  onSelect,
  selectedColor,
  style,
  innerBorderColor = 'white',
  outerBorderColor = 'black',
}) => {
  const [selected, setSelected] = useState(selectedColor);

  const handleSelect = (color: string) => {
    setSelected(color);
    onSelect(color);
  };

  return (
    <View style={[styles.container, style]} testID={'component_color'}>
      {colors.map((color, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelect(color)}
          style={[
            styles.outerCircle,
            selected === color ? {borderColor: outerBorderColor} : {}, // outer border if the user select it
          ]}>
          <View
            style={[
              styles.innerCircle,
              {backgroundColor: color, borderColor: innerBorderColor},
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerCircle: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 25,
    height: 25,
    borderRadius: 15,
    borderWidth: 2,
  },
});

export default ColorSelector;
