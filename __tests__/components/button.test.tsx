import React from 'react';
import {it, describe, jest, expect} from '@jest/globals';
import renderer from 'react-test-renderer';
import {Button} from '../../src/components';

describe('<Button/>', () => {
  const functionMock = jest.fn();
  it('make sure component rendered', () => {
    const componentCreate = renderer.create(
      <Button title={'test'} onPress={functionMock} />,
    );
    expect(
      componentCreate.root.findByProps({testID: 'component_button'}),
    ).toBeTruthy();
  });

  it('make sure call back function called', () => {
    const componentCreate = renderer.create(
      <Button title={'test'} onPress={functionMock} />,
    );
    componentCreate.root.props.onPress();
    expect(functionMock).toBeCalledWith();
  });

  it('renders with different titles', () => {
    const titles = ['Submit', 'Cancel', 'OK', ''];
    titles.forEach(title => {
      const component = renderer.create(
        <Button title={title} onPress={functionMock} />,
      );
      const titleElement = component.root.findByProps({testID: 'button_title'});
      expect(titleElement.props.children).toBe(title);
    });
  });

  it('renders disabled state correctly', () => {
    const component = renderer.create(
      <Button title={'test'} onPress={functionMock} disabled={true} />,
    );
    const buttonElement = component.root.findByProps({
      testID: 'component_button',
    });
    expect(buttonElement.props.disabled).toBeTruthy();
  });
});
