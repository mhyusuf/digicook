import React from 'react';
import { shallow } from 'enzyme';
import util from '../../util';
import { CollectionForm } from '../CollectionForm';

describe('CollectionForm Component', () => {
  it('Should render without errors', () => {
    const component = shallow(
      <CollectionForm
        initialState={{}}
        submitHandler={() => {}}
        history={[]}
      />,
    );
    const wrapper = util.findByDataTest(component, 'CollectionFormComponent');
    expect(wrapper.length).toEqual(1);
  });
});
