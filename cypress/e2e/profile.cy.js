describe('A logged in user', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('http://127.0.0.1:5173/holidaze/');
    cy.wait(1000);
    // Login
    cy.get('a').contains('Login').should('be.visible').click();
    cy.wait(500);
    cy.get('input[type="email"]').type('holidazeCustomer@noroff.no');
    cy.get('input[type="password"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    // Navigate to profile page
    cy.get('button[aria-label="Profile menu button"]').click();
    cy.contains('Profile').click();
    cy.wait(500);
    cy.url().should('include', '/profile');
  });

  it('Can update profile avatar', () => {
    cy.wait(500);

    // Click the "Edit avatar" button
    cy.get('button[aria-label="Update avatar button"]').click();

    // Clear the input field
    cy.get('input[name="avatar"]').clear();

    // Type the new image URL
    const newImageUrl =
      'https://images.pexels.com/photos/4926674/pexels-photo-4926674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    cy.get('input[name="avatar"]').type(newImageUrl);

    // Click the "Update" button
    cy.contains('Update').click();

    cy.contains('Successfully changed avatar').should('be.visible');
    cy.wait(2000);
    // Check that the avatar has been updated
    cy.get('img[alt="Profile avatar of holidazeCustomer"]').should(
      'have.attr',
      'src',
      newImageUrl
    );
  });

  it('Can view a list of upcoming bookings', () => {
    // Check if there are any upcoming bookings
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="upcoming-bookings"]').length > 0) {
        // Upcoming bookings are present
        cy.get('[data-testid="upcoming-bookings"]').should('be.visible');
      } else {
        // No upcoming bookings
        cy.contains('You have no upcoming bookings').should('be.visible');
      }
    });
  });

  it('Can log out', () => {
    cy.get('button[aria-label="Profile menu button"]').click();
    cy.contains('Log out').click();
    cy.wait(500);
    cy.url().should('include', '/');
    cy.get('a').contains('Login').should('be.visible');
    cy.get('a').contains('Register').should('be.visible');
  });
});
