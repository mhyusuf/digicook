// import '@types/jest'
import React from 'react';
import { shallow } from 'enzyme';
import FormField from '../FormField'
import util from '../../util';

// const { label, name, type, onChange, value, children } = props;

describe('FormField Component', ()=> {
  
  it('Should render textarea type without errors', ()=> {
    
    const component = shallow(<FormField type="textarea" name="" rows={2} value="" onChange={jest.fn()}/>);
    const wrapper = util.findByDataTest(component, 'FormFieldComponent textarea');
    expect(wrapper.length).toEqual(1);
  
  });
  
  it('Should render select type without errors', ()=> {

    const component = shallow(<FormField type="select" name="" value="" onChange={jest.fn()}/>);
    const wrapper = util.findByDataTest(component, 'FormFieldComponent select');
    expect(wrapper.length).toEqual(1);
  
  });

  it('Should render default type without errors', ()=> {

    const component = shallow(<FormField type="" id="" name="" value="" onChange={jest.fn()}/>);
    const wrapper = util.findByDataTest(component, 'FormFieldComponent default');
    expect(wrapper.length).toEqual(1);
  
  });

  

})