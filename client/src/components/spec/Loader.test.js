// import '@types/jest'
import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../Loader'
import findByDataTest from '../../../util/findByDataTest';

const setUp = () => {
  const component = shallow(<Loader />);
  return component;
}

describe('Loader Component', ()=> {

  let component;
  beforeEach(()=>{
    component = setUp();
  });

  it('Should render without errors', ()=> {
    const wrapper = findByDataTest(component, 'LoaderComponent');
    expect(wrapper.length).toEqual(1);
  })

})