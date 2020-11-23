// import '@types/jest'
import React from 'react';
import { shallow } from 'enzyme';
import FormField from '../FormField'
import util from '../../util';

// const { label, name, type, onChange, value, children } = props;

describe('FormField Component', ()=> {

  it('Should render full component without errors', () => {
    const component = shallow(<FormField type="" name="" rows={2} value="" onChange={jest.fn()}/>);
    const wrapper = util.findByDataTest(component, 'FormFieldComponent');
    expect(wrapper.length).toEqual(1);
  });

  it('Should render textarea type without errors', ()=> {
    
    const component = shallow(<FormField type="textarea" name="" rows={2} value="" onChange={jest.fn()}/>);
    const wrapper = util.findByDataTest(component, 'FormFieldInput textarea');
    expect(wrapper.length).toEqual(1);
  
  });
  
  it('Should render select type without errors', ()=> {

    const component = shallow(<FormField type="select" name="" value="" onChange={jest.fn()}/>);
    const wrapper = util.findByDataTest(component, 'FormFieldInput select');
    expect(wrapper.length).toEqual(1);
  
  });

  it('Should render default type without errors', ()=> {

    const component = shallow(<FormField type="" id="" name="" value="" onChange={jest.fn()}/>);
    const wrapper = util.findByDataTest(component, 'FormFieldInput default');
    expect(wrapper.length).toEqual(1);
  
  });

  

})