import { login } from '../support/login_common.js'
import { gotoProperties, 
        clickAddProperty,
        createMultiUnitProperty, 
        updateUnitSettings,
        searchPropertyName,
        verifyPropertyTypeOrder, 
        clickSubmitAddProperty} from '../support/property_common.js'


describe('Propertyies Test Specs', () => {
    let testData

    before(() => {
        cy.fixture('testData').then((data) => {
            testData = data
            testData.propertyName += Date.now()
        })
    })
    
    beforeEach(() => {
        login(Cypress.env('username'), Cypress.env('password'))
    })

    it('Add a property with a multiple rentable units', () => {
        // Go to Properties Page and click Add Property button
        gotoProperties()
        clickAddProperty()

        // Validate property type show in correct order as per API response
        // This step is for Additional Task #3 - using REST API call
        verifyPropertyTypeOrder()

        // Create Multi Unit Property
        createMultiUnitProperty(
            testData.propertyName, 
            testData.unitCount, 
            testData.unitOwner,
            testData.propertyAddress1,
            testData.propertyAddress2,
            testData.propertyPostCode,
            testData.propertyCity,
            testData.propertyCounty)
        updateUnitSettings(testData.unitCount, 
            testData.unitType, 
            testData.unitOwner, 
            testData.manager, 
            testData.agent)

        clickSubmitAddProperty()
        
        // Validate the added property
        cy.get('h2').should('contain.text', 'Multiple Units Added')
        cy.contains(testData.propertyName).should('be.visible')
        cy.contains(testData.unitCount + " units have been added").should('be.visible')

        // for testing purpose
        // comment out if needed
        // testData.propertyName = 'Cypress Property 1636198736465'

        // Re-click Property page and search for added property
        gotoProperties()
        searchPropertyName(testData.propertyName)

        // Validate search result contains added property
        cy.waitForDataPopulate()
        cy.contains('table.properties td', testData.propertyName).parent().within(() => {
            cy.get('td.name').should('contain.text', testData.propertyName)
            cy.get('td.property-description').should('contain.text', 'Multiple Units')
            cy.get('td.owner').should('contain.text', testData.unitOwner)
            cy.get('td.rentable-units').should('contain.text', testData.unitCount + '/' + testData.unitCount)
        })
    })
})
