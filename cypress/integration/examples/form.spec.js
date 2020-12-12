describe('Search test', () => {
  it('Can fill the form', () => {
    cy.visit('/');
    cy.get('div[data-test=SearchComponent] > .item > .input > input').type('Bullsh');
    const header = cy.get('div[data-test=CollectionListComponent] > div[data-test=CollectionListItemComponent] > .content > .header');
    header.should('contain', 'Bullshit');
  });
});