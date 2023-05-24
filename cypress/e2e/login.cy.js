describe('Login', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.wait(1000);
    cy.get('a').contains('Login').should('be.visible').click();
    cy.wait(500);
  });

  it('Validates empty inputs', () => {
    cy.wait(1000);
    cy.get('input[type="email"]').as('emailInput');
    cy.get('input[type="password"]').as('passwordInput');

    cy.get('button[type="submit"]').click();
    cy.wait(500);

    cy.get('@emailInput')
      .should('be.visible')
      .get('#inputError')
      .should('be.visible');

    cy.get('@passwordInput')
      .should('be.visible')
      .get('#inputError')
      .should('be.visible');
  });

  it('Logs in successfully with valid credentials', () => {
    cy.get('input[type="email"]').type('mth@noroff.no');
    cy.get('input[type="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.wait(2000);
    // Check if login is a success
    cy.url().should('include', '/venues');
    cy.get('button[aria-label="Profile menu button"]').click();
    cy.contains('Profile').click();
    cy.wait(500);
    cy.url().should('include', '/profile');
    // Check that logged in user email is visible on the profile page
    cy.contains('mth@noroff.no');
  });
});
