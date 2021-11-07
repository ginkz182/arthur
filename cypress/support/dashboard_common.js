export const goToDashboard = () => {
    cy.get('#main-menu').contains('Dashboard').click()
    cy.waitLoadingDisappear()
}
