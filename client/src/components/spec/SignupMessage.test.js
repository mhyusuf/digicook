// import '@types/jest'
import React from 'react';
import { shallow } from 'enzyme';
import SignupMessage from '../SignupMessage'
import util from '../../util';

describe('SignupMessage Component', ()=> {
  
  it('Should render without errors', ()=> {
    
    const component = shallow(<SignupMessage />);
    const wrapper = util.findByDataTest(component, 'SignupMessageComponent');
    expect(wrapper.length).toEqual(1);
  })

})