export const goToTasks = () => {
    cy.get('#main-menu').contains('Tasks').click()
    cy.waitForDataPopulate()
}

export const clickAddTask = () => {
    cy.get('.page-header .actions').contains('Add Task').click()
}

export const addTaskDetails = (propertyName, desc, assign, type, emergency) => {
    cy.select2dropdownByValue('#s2id_TaskRelatedLookupId', propertyName)
    cy.get('#TaskDescription').type(desc)
    cy.get('#s2id_TaskAssigneePersonId input').type(assign)
    cy.get('#select2-drop li').contains(assign).click()
    cy.get('[name=\'data[Task][task_type_id]\']').select(type)
    cy.get('#TaskEmergency').select(emergency) 
}

export const updateDueDateTime = (date, time) => {
    cy.get('#TaskDateDue').type(date.format('D/MM/YYYY'))
    cy.get('#TaskTimeDue').type(time)
}

export const uploadAttachment = (attachfile) => {
    cy.get('#dropzone-helper-droparea').attachFile(attachfile, {subjectType: 'drag-n-drop'})
    cy.waitUntil(() => cy.get('.dz-progress').should('not.be.visible'))
}

export const clickSaveTask = () => {
    cy.get('.btn-success').click()
}

export const validateAddedTask = (todaysDate, timeNow, type, assign, propertyName, attachment) => {
    cy.get('.summary .summary-data-container')
        .should('contain.text', todaysDate.format('D MMM YYYY'))
        .should('contain.text', timeNow)
        .should('contain.text', type)
        .should('contain.text', assign)

    cy.get('.sub-title')
        .should('contain.text', propertyName)
    cy.get('.data-item-relationship')
        .should('contain.text', propertyName)

    cy.get('.dz-helper-doc-name').should('contain.text', attachment)
}

export const validateAddedTaskInTable = (desc, propertyName, type, todaysDate, timeNow) => {
    cy.contains('table.tasks td', desc).parent().within(() => {
        cy.get('td.name')
            .should('contain.text', desc)
            .should('contain.text', propertyName)

        cy.get('td.task-type-name')
            .should('contain.text', type)
        
        cy.get('td.created')
            .should('contain.text', todaysDate.format('D MMM YYYY'))
        
        cy.get('td.date-due')
            .should('contain.text', todaysDate.format('D MMM YYYY') + ' at ' + timeNow)
    })
}
