import React from 'react';
import { mount } from 'enzyme';
import Toolbar from '../../components/Toolbar';

describe('Toolbar', () => {
  it('Renders a group of radio buttons with provided titles', () => {
    const buttons = [
      {
        title: 'Bottone1',
        key: 2,
        func: () => {},
      },
      {
        title: 'Button2',
        key: 3,
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
      options: [
        {
          value: 1,
          label: 'jsjsjsj',
        },
      ],
    };

    const props = {
      buttons,
      defaultButtonKey: 3,
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
        key: 1,
        func: mockFn,
      },
      {
        title: 'Button2',
        key: 2,
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
      options: [],
    };

    const props = {
      buttons,
      defaultButtonKey: 1,
      add,
      search,
    };

    const wrapper = mount(<Toolbar {...props} />);
    wrapper.find('ToggleButton[value=1]').simulate('click'); // emulate button click
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
