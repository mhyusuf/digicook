// import '@types/jest'
import React from 'react';
import { shallow } from 'enzyme';
import findByDataTest from '../../../util/findByDataTest';
import NavbarLink from '../NavbarLink';

const setUp = (props) => {
  const component = shallow(<NavbarLink {...props} />);
  return component;
}

describe('NavbarLink Component', () => {
  
  let component;
  const sampleProps = {
    to: '/',
    text: 'any string'
  }
  beforeEach(()=>{
    component = setUp(sampleProps);
  });

  it('Should render without errors', ()=> {
    const wrapper = findByDataTest(component, 'NavbarLinkComponent');
    expect(wrapper.length).toEqual(1);
  })

})