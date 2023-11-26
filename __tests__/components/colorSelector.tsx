import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import renderer, {act} from 'react-test-renderer';
import ColorSelector from '../../src/components/inputComponents/colorSelector';
import {it, describe, jest, expect} from '@jest/globals';

describe('<ColorSelector/>', () => {
  const mockColors = ['red', 'green', 'blue'];
  const onSelectMock = jest.fn();

  it('renders without crashing', () => {
    const component = renderer.create(
      <ColorSelector colors={mockColors} onSelect={onSelectMock} />,
    );
    expect(
      component.root.findByProps({testID: 'component_color'}),
    ).toBeTruthy();
  });

  it('renders all color options', () => {
    const component = renderer.create(
      <ColorSelector colors={mockColors} onSelect={onSelectMock} />,
    );
    const touchables = component.root.findAllByType(TouchableOpacity);
    expect(touchables.length).toBe(mockColors.length);
  });

  it('calls onSelect with correct color on selection', () => {
    const component = renderer.create(
      <ColorSelector colors={mockColors} onSelect={onSelectMock} />,
    );
    const firstColorTouchable =
      component.root.findAllByType(TouchableOpacity)[0];

    act(() => {
      firstColorTouchable.props.onPress();
    });

    expect(onSelectMock).toHaveBeenCalledWith(mockColors[0]);
  });
  it('applies custom styles correctly', () => {
    const customStyle = {backgroundColor: 'yellow'};
    const component = renderer.create(
      <ColorSelector
        colors={mockColors}
        onSelect={onSelectMock}
        style={customStyle}
      />,
    );
    const containerStyle = component.root.findByType(View).props.style;

    // Check if one of the style objects in the array matches the custom style
    expect(containerStyle).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );
  });
});
