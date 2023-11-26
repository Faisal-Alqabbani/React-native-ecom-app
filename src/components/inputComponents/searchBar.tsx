import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import globalStyle from '../../styles/global.style';
import {ImageAsset} from '../index';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: object;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.icon}>
        {/* Replace with your search icon */}
        <ImageAsset name={'search'} fill={globalStyle.primaryColor1} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  icon: {
    padding: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
});

export default SearchBar;
