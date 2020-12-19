// import '@types/jest'
import React from 'react';
import { shallow } from 'enzyme';
import Search from '../Search';
import util from '../../util';

describe('Search Component', () => {
  it('Should render without errors', () => {
    const component = shallow(
      <Search value="" onChange={jest.fn()} placeholder="placeholder" />,
    );
    const wrapper = util.findByDataTest(component, 'SearchComponent');
    expect(wrapper.length).toEqual(1);
  });
});
