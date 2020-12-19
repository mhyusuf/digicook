// import '@types/jest'
import React from 'react';
import { shallow } from 'enzyme';
import util from '../../util';
import { RecipeListItem } from '../RecipeListItem';
import mockState from '../../mocks/mockState';

describe('RecipeListItem Component', () => {
  let component;
  const recipe = mockState.collections.recipe;

  beforeEach(() => {
    component = shallow(
      <RecipeListItem recipe={recipe} deleteRecipe={() => {}} menus={false} />,
    );
  });

  it('Should render without errors', () => {
    const wrapper = util.findByDataTest(component, 'RecipeListItemComponent');
    expect(wrapper.length).toEqual(1);
  });
});
