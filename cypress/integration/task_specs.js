import { goToDashboard } from '../support/dashboard_common.js'
import { login } from '../support/login_common.js'
import { addMultipleUnitsProperty } from '../support/property_common.js'
import { addTaskDetails, clickAddTask,
        clickSaveTask,
        goToTasks, 
        updateDueDateTime,
        uploadAttachment,
        validateAddedTask,
        validateAddedTaskInTable} from '../support/task_common.js'

const dayjs = require('dayjs')

describe('Task Test Specs', () => {
    let testData

    before(() => {
        cy.fixture('testData').then((data) => {
            testData = data
            testData.propertyName += Date.now()
            testData.taskDescription += Date.now()
        })
    })

    beforeEach(() => {
        login(Cypress.env('username'), Cypress.env('password'))

        // Pre-condition to have property added
        addMultipleUnitsProperty(
            testData.propertyName, 
            testData.unitCount, 
            testData.unitType, 
            testData.unitOwner, 
            testData.manager, 
            testData.agent,
            testData.propertyAddress1,
            testData.propertyAddress2,
            testData.propertyPostCode,
            testData.propertyCity,
            testData.propertyCounty)
    })

    it('Add a task related to created property ', () => {

        // Data for testing purpose
        // testData.propertyName = 'Cypress Property 1636202582765'
        // testData.taskDescription = 'Task from Cypress 1636267454914'
        // cy.visit('https://staging.arthuronline.co.uk/robottester/tasks/view/1102843')

        goToTasks()
        clickAddTask()

        // Add Task and relate to created property
        addTaskDetails(testData.propertyName, 
            testData.taskDescription, 
            testData.taskAssign, 
            testData.taskType, 
            testData.taskEmergency)

        const todaysDate = dayjs()
        const timeNow = todaysDate.format('h:mm')
        updateDueDateTime(todaysDate, timeNow)
 
        // Additional Task #4 cypress-file-upload and cypress-wait-until
        uploadAttachment(testData.taskAttachment)

        clickSaveTask()

        cy.url().should('include', 'tasks/view')
        cy.get('.identifier .name').invoke('text').as('taskName')
        
        // Validate added task record
        validateAddedTask(todaysDate, 
            timeNow, 
            testData.taskType, 
            testData.taskAssign, 
            testData.propertyName,
            testData.taskAttachment)
        
        // Validate in Tasks Menu
        goToTasks()
        validateAddedTaskInTable(testData.taskDescription, 
            testData.propertyName, 
            testData.taskType, 
            todaysDate, 
            timeNow)

        // Validate Notification in Dashboard
        goToDashboard()
        cy.get('@taskName').then((text) => {
            cy.get('.message-text').contains(text.split(' ')[1]).should('be.visible')
        })
    })
})
