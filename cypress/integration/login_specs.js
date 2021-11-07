import { login } from '../support/login_common.js'

describe('Login Test Specs', () => {

    it('Login to page with valid credentials', () => {
        login(Cypress.env('username'), Cypress.env('password'))

        cy.url().should('include', 'dashboards/index')
        cy.get('.personal-name').should('contain.text', Cypress.env('personalName'))

        cy.get('.dashboards.overview').should('be.visible')
        cy.get('.dashboards.rent_unit').should('be.visible')
        cy.get('.box-agendas').should('be.visible')
    })
})
