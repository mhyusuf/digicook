// import '@types/jest'
import React from 'react';
import { shallow } from 'enzyme';
import AuthButton from '../AuthButton'
import util from '../../util';


describe('AuthButton Component', ()=> {

  it('Should render without errors if logged in', ()=> {
    const component = shallow(<AuthButton isLoggedIn={true}/>);
    const wrapper = util.findByDataTest(component, 'AuthButtonComponent, LoggedIn');
    expect(wrapper.length).toEqual(1);
  });

  it('Should render proper text if logged in', ()=> {
    const component = shallow(<AuthButton isLoggedIn={true}/>);
    const wrapper = util.findByDataTest(component, 'AuthButtonComponent, LoggedIn');
    const link = wrapper.find('a');
    expect(link.text()).toEqual('Log out');
  });


  it('Should render without errors if logged out', ()=> {
    const component = shallow(<AuthButton isLoggedIn={false}/>);
    const wrapper = util.findByDataTest(component, 'AuthButtonComponent, LoggedOut');
    expect(wrapper.length).toEqual(1);
  })

  it('Should render proper text if logged out', ()=> {
    const component = shallow(<AuthButton isLoggedIn={false}/>);
    const wrapper = util.findByDataTest(component, 'AuthButtonComponent, LoggedOut');
    const link = wrapper.find('a');
    expect(link.text()).toEqual('Login with Google');
  });


})