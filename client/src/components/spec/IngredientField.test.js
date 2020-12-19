// import '@types/jest'
import React from 'react';
import { shallow } from 'enzyme';
import IngredientField from '../IngredientField';
import util from '../../util';

// const { label, name, type, onChange, value, children } = props;

describe('IngredientField Component', () => {
  it('Should render primary component without errors', () => {
    const component = shallow(
      <IngredientField
        idx={2}
        value=""
        onChange={jest.fn()}
        onRemove={jest.fn()}
      />,
    );
    const wrapper = util.findByDataTest(component, 'IngredientFieldComponent');
    expect(wrapper.length).toEqual(1);
  });

  it('Should conditionally render accurately', () => {
    const componentA = shallow(
      <IngredientField
        idx={0}
        value=""
        onChange={jest.fn()}
        onRemove={jest.fn()}
      />,
    );
    const wrapperA = util.findByDataTest(
      componentA,
      'IngredientFieldComponent-conditional',
    );
    expect(wrapperA.length).toEqual(1);

    const componentB = shallow(
      <IngredientField
        idx={2}
        value=""
        onChange={jest.fn()}
        onRemove={jest.fn()}
      />,
    );
    const wrapperB = util.findByDataTest(
      componentB,
      'IngredientFieldComponent-conditional',
    );
    expect(wrapperB.length).toEqual(0);
  });
});
