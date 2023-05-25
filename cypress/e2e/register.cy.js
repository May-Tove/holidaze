describe('Register', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.wait(1000);
    cy.get('a').contains('Register').should('be.visible').click();
    cy.wait(500);
  });

  it('Validates empty inputs', () => {
    cy.wait(1000);
    cy.get('input[name="name"]').as('nameInput');
    cy.get('input[name="email"]').as('emailInput');
    cy.get('input[name="password"]').as('passwordInput');
    cy.get('input[name="avatar"]').as('avatarInput');

    cy.get('button[type="submit"]').click();
    cy.wait(500);

    cy.get('@nameInput')
      .should('be.visible')
      .get('#inputError')
      .should('be.visible');

    cy.get('@emailInput')
      .should('be.visible')
      .get('#inputError')
      .should('be.visible');

    cy.get('@passwordInput')
      .should('be.visible')
      .get('#inputError')
      .should('be.visible');

    cy.get('@avatarInput')
      .should('be.visible')
      .get('#inputError')
      .should('be.visible');
  });

  it('Displays error when registering an already registered user', () => {
    // Use credentials of an existing user
    cy.get('input[name="name"]').type('registerCypress2');
    cy.get('input[name="email"]').type('registerCypress2@noroff.no');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="avatar"]').type(
      'https://images.unsplash.com/photo-1541779408-c355f91b42c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80'
    );

    cy.get('button[type="submit"]').click();
    cy.wait(300);

    // Error message should be visible
    cy.get('[data-testid="error-message"]').should('be.visible');
  });

  it('Can register successfully as a customer', () => {
    cy.get('input[name="name"]').type('registerCypress99');
    cy.get('input[name="email"]').type('registerCypress99@noroff.no');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="avatar"]').type(
      'https://images.unsplash.com/photo-1541779408-c355f91b42c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80'
    );
    cy.get('button[type="submit"]').click();
    cy.contains(
      'Registration successful, you can now log in to your account'
    ).should('be.visible');
    cy.wait(2000);
    cy.url().should('include', '/login');
  });

  it('Can register successfully as a venue manager', () => {
    cy.get('input[name="name"]').type('VenueManagerCypress99');
    cy.get('input[name="email"]').type('VenueManagerCypress99@noroff.no');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="avatar"]').type(
      'https://images.unsplash.com/photo-1541779408-c355f91b42c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80'
    );
    cy.get('input[name="venueManager"]').check();
    cy.get('button[type="submit"]').click();
    cy.contains(
      'Registration successful, you can now log in to your account'
    ).should('be.visible');
    cy.wait(2000);
    cy.url().should('include', '/login');

    // Log in and navigate to the profile
    cy.get('input[type="email"]').type('VenueManagerCypress1@noroff.no');
    cy.get('input[type="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/venues');
    cy.get('button[aria-label="Profile menu button"]').click();
    cy.contains('Profile').click();
    cy.wait(500);
    cy.url().should('include', '/profile');
    cy.wait(300);
    // Check that it says that the user is a venue manager in the profile
    cy.contains('Venue Manager').should('be.visible');
  });
});
