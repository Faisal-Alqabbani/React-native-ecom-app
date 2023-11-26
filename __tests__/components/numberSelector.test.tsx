import React from 'react';
import {TouchableOpacity} from 'react-native';
import renderer, {act} from 'react-test-renderer';
import NumberSelector from '../../src/components/inputComponents/numberSelector';
import {jest, describe, it, expect} from '@jest/globals';

describe('<NumberSelector/>', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<NumberSelector />);
    expect(component.toJSON()).toBeTruthy();
  });

  it('increments and decrements the number', () => {
    const component = renderer.create(<NumberSelector />);
    const {root} = component;
    const incrementButton = root.findAllByType(TouchableOpacity)[1]; // this is going to be inc
    const decrementButton = root.findAllByType(TouchableOpacity)[0]; // this is going to be dec
    const numberText = root.findByProps({testID: 'test_number_inc_dec'}); // get the text by test Id

    // Initial number should be 1
    expect(numberText.props.children).toBe(1);

    // Increment
    act(() => incrementButton.props.onPress());
    expect(numberText.props.children).toBe(2);

    // Decrement
    act(() => decrementButton.props.onPress());
    expect(numberText.props.children).toBe(1);
  });
  // second
  it('respects min and max limits', () => {
    const minNumber = 0;
    const maxNumber = 5;
    const component = renderer.create(
      <NumberSelector minNumber={minNumber} maxNumber={maxNumber} />,
    );
    const {root} = component;
    const incrementButton = root.findAllByType(TouchableOpacity)[1];
    const decrementButton = root.findAllByType(TouchableOpacity)[0];
    const numberText = root.findByProps({testID: 'test_number_inc_dec'});

    // Increment to max
    for (let i = 0; i < maxNumber + 1; i++) {
      act(() => incrementButton.props.onPress());
    }
    expect(numberText.props.children).toBe(maxNumber);

    // Decrement to min
    for (let i = maxNumber; i >= minNumber - 1; i--) {
      act(() => decrementButton.props.onPress());
    }
    expect(numberText.props.children).toBe(minNumber);
  });

  it('calls onValueChange with the new number', () => {
    const onValueChangeMock = jest.fn();
    const component = renderer.create(
      <NumberSelector onValueChange={onValueChangeMock} />,
    );
    const incrementButton = component.root.findAllByType(TouchableOpacity)[1];

    act(() => incrementButton.props.onPress());
    expect(onValueChangeMock).toHaveBeenCalledWith(2);
  });
});
