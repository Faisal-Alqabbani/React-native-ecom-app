import React, {useMemo, useState} from 'react';
import {ImageAsset, Text} from '../index';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import globalStyle from '../../styles/global.style';

interface DropdownButtonProps {
  data: string[];
  onSelect: (item: string) => void;
  type?: 'primary' | 'secondary';
  withPadding?: boolean;
  borderRadius?: number;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  data,
  onSelect,
  type = 'primary',
  withPadding = false,
  borderRadius = 200,
}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('');

  const handleSelect = (item: string) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };
  const getButtonColor = React.useMemo(() => {
    switch (type) {
      case 'primary':
        return {backgroundColor: globalStyle.primaryColor1};
      case 'secondary':
        return {backgroundColor: globalStyle.primaryColor2};
      default:
        return {backgroundColor: globalStyle.primaryColor2};
    }
  }, [type]);

  return (
    <View style={styles.container} testID={'component_dropdown'}>
      <TouchableOpacity
        style={[
          styles.button,
          getButtonColor,
          {paddingHorizontal: withPadding ? 15 : 5},
          {borderRadius: borderRadius},
        ]}
        onPress={() => setVisible(true)}>
        <Text size={'14'} color={globalStyle.solid_white}>
          {selected || data[0]}
        </Text>
        <ImageAsset
          name={'arrowDown'}
          fill={globalStyle.solid_white}
          size={15}
          style={{transform: [{rotate: visible ? '180deg' : '0deg'}]}}
        />
      </TouchableOpacity>
      <Modal transparent={true} visible={visible} animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}>
          <SafeAreaView style={styles.modalContainer}>
            <FlatList
              data={data}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item)}>
                  <Text size={'16'}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: globalStyle.primaryColor2,
    padding: 10,

    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContainer: {
    backgroundColor: globalStyle.solid_white,
    width: '80%',
    borderRadius: 5,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default DropdownButton;
