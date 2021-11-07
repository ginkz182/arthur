import 'cypress-file-upload'
import 'cypress-wait-until'

Cypress.Commands.add('select2dropdownByValue', (parentSelector, value) => {
    cy.get(parentSelector).click()
    cy.get('#select2-drop').within(() => {
        cy.get('input').type(value)
        cy.contains('Searching').should('not.exist')
        cy.get('li').contains(value).click()
    }) 
})

Cypress.Commands.add('waitForDataPopulate', () => {
    cy.waitLoadingDisappear()
    cy.get('table tr.defer-row', {timeout: 10000}).should('not.exist')
})

Cypress.Commands.add('waitLoadingDisappear', () => {
    cy.get('div.loading.loading-overlay').should('not.exist')
})
