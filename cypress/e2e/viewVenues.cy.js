describe('A user', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('http://localhost:5173/holidaze/');
    cy.get('a').contains('Discover venues').should('be.visible').click();
  });

  it('Can view list of all venues', () => {
    cy.wait(500);
    cy.url().should('include', '/venues');

    // Check if there are any venue cards
    cy.get('[data-testid="venue-card"]').then(($venueCards) => {
      // Check if at least one venue card is present
      expect($venueCards.length).to.be.greaterThan(0);
      // Check if all venue cards are visible
      $venueCards.each((i, $card) => {
        cy.wrap($card).should('be.visible');
      });
    });
  });

  it('Can search for a specific venue', () => {
    cy.wait(500);
    cy.url().should('include', '/venues');
    cy.get('input[name="search"]').type('house', { force: true });
    cy.get('[data-testid="venue-card"]').each(($venueCard) => {
      cy.wrap($venueCard)
        .find('h2')
        .invoke('text')
        .then((text) => {
          expect(text.toLowerCase()).to.include('house');
        });
    });
  });

  it('Can view a specific venue by ID', () => {
    cy.wait(500);
    cy.url().should('include', '/venues');
    cy.get('[data-testid="venue-card"]').first().click();
    cy.url().then((url) => {
      const venueId = url.split('/').pop();
      cy.url().should('include', `/venue/${venueId}`);
    });
  });
});
