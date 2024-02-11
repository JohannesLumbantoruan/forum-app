/**
 * - Register spec
 *  - should display register page correctly
 *  - should display alert when email already used
 */

describe('Register spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/register');
    });

    it('should display register page correctly', () => {
        // verify visible elements on register page
        cy.get('input[placeholder="Name"]').should('be.visible');
        cy.get('input[placeholder="Email"]').should('be.visible');
        cy.get('input[placeholder="Password"]').should('be.visible');
    });

    it('should display alert when email already used', () => {
        // fill name
        cy.get('input[placeholder="Name"]').type('John Doe');

        // fill email
        cy.get('input[placeholder="Email"]').type('johndoe@mail.com');

        // fill password
        cy.get('input[placeholder="Password"]').type('mypassword');

        // click register
        cy.get('button').contains(/^Register$/).click();

        // verify window.alert showing error message from api
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('email is already taken');
        });
    });
});