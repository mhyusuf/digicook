// import '@types/jest'
import React from 'react';
import { shallow } from 'enzyme';
import SignupMessage from '../SignupMessage';
import util from '../../util';

describe('SignupMessage Component', () => {
  let component;
  beforeEach(() => {
    component = shallow(<SignupMessage />);
  });

  it('Should render without errors', () => {
    const wrapper = util.findByDataTest(component, 'SignupMessageComponent');
    expect(wrapper.length).toEqual(1);
  });

  it('Should render proper text content', () => {
    const header = component.find('.header');
    expect(header.text()).toEqual('Log in to share your recipes!');
    expect(header.find('a').text()).toEqual('Log in');
  });
});
