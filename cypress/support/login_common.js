export const login = (username, password) => {
    cy.visit(Cypress.env('loginurl'))

    cy.get('#UserEmail').type(username)
    cy.get('#UserPassword').type(password)
    cy.get('input[type=submit]').click()
}
