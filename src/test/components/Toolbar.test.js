import React from 'react';
import { mount } from 'enzyme';
import Toolbar from '../../components/Toolbar';

describe('Toolbar', () => {
  it('Renders a group of radio buttons with provided titles', () => {
    const buttons = [
      {
        title: 'Bottone1',
        func: () => {},
      },
      {
        title: 'Button2',
        func: () => {},
      },
    ];

    const add = {
      presence: true,
      func: () => {},
    };

    const search = {
      presence: false,
      func: () => {},
    };

    const props = {
      buttons,
      add,
      search,
    };

    const wrapper = mount(<Toolbar {...props} />);
    wrapper.find('ToggleButton').forEach((b, idx) => expect(b.text()).toEqual(buttons[idx].title));
  });

  it('Calls func when button is pressed', () => {
    const mockFn = jest.fn();

    const buttons = [
      {
        title: 'Bottone1',
        func: mockFn,
      },
      {
        title: 'Button2',
        func: () => {},
      },
    ];

    const add = {
      presence: true,
      func: () => {},
    };

    const search = {
      presence: false,
      func: () => {},
    };

    const props = {
      buttons,
      add,
      search,
    };

    const wrapper = mount(<Toolbar {...props} />);
    wrapper.find('ToggleButton[value=1]').simulate('click'); // emulate button click
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
