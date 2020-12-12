// import '@types/jest'
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import util from '../../util';
import { CollectionListItem } from '../CollectionListItem';
import mockState from '../../mocks/mockState';


describe('CollectionListItem Component', () => {
  
  let component;
  const collection = mockState.collections.collectionList[0];

  beforeEach(() => {
    component = shallow(
      <CollectionListItem collection={collection} history={[]} deleteCollection={()=>{}} menus={false}/>
      );
  });
      
  it('Should render without errors', () => {
    const wrapper = util.findByDataTest(component, 'CollectionListItemComponent');
    expect(wrapper.length).toEqual(1);
  });

  it('Should display title', () => {
    const wrapper = component.find('.content > .header');
    expect(wrapper.text()).toEqual(collection.name);
  });

  it('Should display creator', () => {
    const wrapper = component.find('.content > .meta');
    expect(wrapper.text()).toEqual(collection._user.name);
  });

  it('Should display description', () => {
    const wrapper = component.find('.content > .description');
    expect(wrapper.text()).toEqual(collection.description);
  });

  it('Should have an img tag', () => {
    const wrapper = component.find('img');
    expect(wrapper.length).toEqual(1);
  });

});
