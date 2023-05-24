describe('A logged in venue manager can manage venues', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.wait(1000);
    cy.get('a').contains('Login').should('be.visible').click();
    cy.wait(500);
    cy.get('input[type="email"]').type('mth@noroff.no');
    cy.get('input[type="password"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.get('button[aria-label="Profile menu button"]').click();
    cy.contains('Profile').click();
    cy.wait(500);
    cy.url().should('include', '/profile');
    // Check that it says that the user is a venue manager in the profile
    cy.contains('Venue Manager').should('be.visible');
  });

  it('Can create a new venue', () => {
    cy.get('button[aria-label="Create new venue button"]').click();

    cy.get('input[name="name"]').type('Cypress Venue');
    cy.get('textarea[name="description"]').type('This is my venue description');
    cy.get('input[name="address"]').type('123 Main St');
    cy.get('input[name="city"]').type('City');
    cy.get('input[name="zip"]').type('12345');
    cy.get('input[name="country"]').type('Country');
    cy.get('input[name="breakfast"]').check();
    cy.get('input[name="wifi"]').check();
    cy.get('input[name="pets"]').check();
    cy.get('input[name="parking"]').check();
    cy.get('input[name="price"]').type('100');
    cy.get('input[name="maxGuests"]').type('10', { force: true });
    cy.get('input[name="imageUrls[0]"]').type(
      'https://images.pexels.com/photos/5563472/pexels-photo-5563472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    );
    cy.get('button[aria-label="Add a new image url input field"]').click();
    cy.wait(300);
    cy.get('input[name="imageUrls[1]"]').type(
      'https://images.unsplash.com/photo-1646572961739-58557003b037?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=722&q=80'
    );
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
    cy.contains('Venue was successfully created!').should('be.visible');
    cy.wait(3000);
    cy.url().then((url) => {
      const venueId = url.split('/').pop();
      cy.url().should('include', `/venue/${venueId}`);
    });
    // Check that the name and description for the venue that just got created is on the site
    cy.get('h1').should(($h1) => {
      expect($h1.text()).to.eq('Cypress Venue');
    });

    cy.contains('This is my venue description');
  });

  it('Can update a venue', () => {
    // Navigate to the first venue on the profile page
    cy.get('a[data-testid="venue-card"]').eq(0).click();
    cy.wait(1000);

    // Find the Edit button
    cy.get('button').contains('Edit').should('exist');
    cy.get('button').contains('Edit').click();
    cy.wait(500);

    // Update the name of the venue
    cy.get('input[name="name"]').clear();
    cy.get('input[name="name"]').type('Cypress New Venue Name');
    cy.wait(500);

    cy.get('button').contains('Update').click();
    cy.contains('Venue was successfully updated').should('be.visible');
    cy.wait(2000);
    cy.url().then((url) => {
      const venueId = url.split('/').pop();
      cy.url().should('include', `/venue/${venueId}`);
    });
    // Check that the name is updated on the page
    cy.get('h1').should(($h1) => {
      expect($h1.text()).to.eq('Cypress New Venue Name');
    });
  });

  it('Can delete a venue', () => {
    // Navigate to the first venue on the profile page
    cy.get('a[data-testid="venue-card"]').eq(0).click();
    cy.wait(1000);

    cy.get('button').contains('Delete').should('exist');
    cy.get('button').contains('Delete').click();
    cy.wait(500);

    cy.contains('Are you sure you want to delete this venue?');
    cy.get('button').contains('Yes, delete this venue').click();
    cy.wait(300);
    cy.contains('Successfully deleted').should('be.visible');
    cy.wait(1000);
    cy.url().should('include', '/venues');
  });
});
