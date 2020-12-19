// import '@types/jest'
import React from 'react';
import { shallow } from 'enzyme';
import util from '../../util';
import CollectionList from '../CollectionList';

describe('CollectionList Component', () => {
  it('Should render without errors', () => {
    const component = shallow(<CollectionList collections={[]} />);
    const wrapper = util.findByDataTest(component, 'CollectionListComponent');
    expect(wrapper.length).toEqual(1);
  });
});
