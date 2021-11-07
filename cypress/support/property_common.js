export const gotoProperties = () => {
    cy.get('#main-menu').contains('Properties').click()
}

export const clickAddProperty = () => {
    cy.get('.page-header .actions').contains('Add Property').click()
}

export const verifyPropertyTypeOrder = () => {
    cy.request(Cypress.env('apiBase') + '/property_types/index/limit:9999.json')
        .then((response) => {
            let data = response.body.data
            data = data.sort((a, b) => parseInt(a.PropertyType.order) - parseInt(b.PropertyType.order))
            cy.get('.select-property-type').find('.property-type .arthur-icon div').each(($type, index, $types) => {
                expect($type.text()).to.equal(data[index].PropertyType.name)     
            })
        })
}

export const createMultiUnitProperty = (propertyName, unitCount, owner, addr1, addr2, postcode, city, county) => {
    cy.get('.multiple-unit.head').click()

    cy.get('#ProfileAddressName').type(propertyName)
    cy.select2dropdownByValue('#s2id_PropertyOwnerId', owner)
    cy.get('#ProfileAddress1').type(addr1)
    cy.get('#ProfileAddress2').type(addr2)
    cy.get('#ProfilePostcode').type(postcode)
    cy.get('#ProfileCity').type(city)
    cy.get('#ProfileCounty').type(county)

    cy.get('#PropertyFullAccess').check()
    cy.get('#PropertyUnitCount').clear().type(unitCount)
    cy.get('.next-page').click()
}

export const updateUnitSettings = (unitCount, unitType, owner, manager, agent) => {
    cy.get('table.multi-unit-table tbody').find('tr')
        .should('have.length', unitCount)
        .each(($tr, index, $trs) => {
            cy.wrap($tr).within(() => {
                cy.get('#MultiUnitIdUnitUnitTypeId').select(unitType)
                cy.get('#MultiUnitIdUnitOwnerId').select(owner)
                cy.get('#MultiUnitIdUnitManagerManagerPersonId').select(manager)
                cy.get('#MultiUnitIdUnitAgentEntityId').select(agent)
            })
        })
}

export const clickSubmitAddProperty = () => {
    cy.get('.next > .submit').click()
    cy.waitLoadingDisappear()
}

export const addMultipleUnitsProperty = (propertyName, unitCount, unitType, owner, manager, agent,
                            addr1, addr2, postcode, city, county) => {
    gotoProperties()
    clickAddProperty()
    createMultiUnitProperty(propertyName, unitCount, owner, addr1, addr2, postcode, city, county)
    updateUnitSettings(unitCount, unitType, owner, manager, agent)
    clickSubmitAddProperty()
    cy.get('h2').should('contain.text', 'Multiple Units Added')
}

export const searchPropertyName = (propertyName) => {
    cy.get('#_q').type(propertyName)
    cy.get('.submit > input').click()
}
