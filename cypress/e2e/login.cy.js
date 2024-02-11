/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    // verify visible elements on login page
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when username and password are wrong', () => {
    // fill email
    cy.get('input[placeholder="Email"]').type('fakemail@mail.com');

    // fill password
    cy.get('input[placeholder="Password"]').type('mypassword');

    // click login button
    cy.get('button').contains(/^Login$/).click();

    // verify window.alert showing error message from api
    cy.on('window:alert', (msg) => {
      expect(msg).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    // fill email
    cy.get('input[placeholder="Email"]').type('johndoe@mail.com');

    // fill password
    cy.get('input[placeholder="Password"]').type('johndoe');

    // click login button
    cy.get('button').contains(/^Login$/).click();

    // verify visible elements on home page
    cy.get('h2').contains(/^Discussions$/).should('be.visible');
    cy.get('li').contains('John Doe').should('be.visible');
  });
});