// import '@types/jest'
import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../Loader';
import util from '../../util';

const setUp = () => {
  const component = shallow(<Loader />);
  return component;
};

describe('Loader Component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('Should render without errors', () => {
    const wrapper = util.findByDataTest(component, 'LoaderComponent');
    expect(wrapper.length).toEqual(1);
  });

  it('Should render correct text', () => {
    const wrapper = util.findByDataTest(component, 'LoaderComponent');
    expect(wrapper.text()).toEqual('Loading');
  });
});
