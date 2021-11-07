# Arthur QA Automation Test

## To run the test

**1. Clone git repo**
```bash
git clone git@github.com:ginkz182/arthur.git
```


**2. Install dependencies**
```bash
npm install package.json
```

**3. Start Cypress test**
```bash
npm run cy:run:staging
```

This command will remove existing logs files and start cypress test for staging environment

**4. Generate test reports**
```bash
npm run gen:reports
```

After the test finished, run this command to merge and generate html report.<br>
The report will be created in **/cypress/reports/test-report.html**

This is for ***additional task #2 to create a report by using Mochawesome as a reporter***


## Scenarios

### Scenario 1: Login to system 
[/cypress/integration/login_specs.js](https://github.com/ginkz182/arthur/blob/main/cypress/integration/login_specs.js)

1. Login to Arthur staging with provided username/password
1. Validate that user can login and home elements display correctly

### Scenario 2: Add a property with a multiple rentable units 
[/cypress/integration/property_specs.js](https://github.com/ginkz182/arthur/blob/main/cypress/integration/property_specs.js)

1. Login to Arthur staging
1. Add new multiple rentable units and enter property details
1. Verify property type order compare to data from API ***(additional task #3 to use REST API call)***
1. Tick checkbox 'I manage this Property'
1. Update number of units to be more than 1 (configurable)
1. Update Unit Settings section
1. Add property
1. Verify property successfully added
1. Verify added property in Properties menu

### Scenario 3: Add a task related to above property
[/cypress/integration/task_specs.js](https://github.com/ginkz182/arthur/blob/main/cypress/integration/task_specs.js)

1. Login to Arthur staging
1. Ensure new property is already added
1. Create new task and relate to added property from #2
1. Upload attachment ***(additional task #4 to use cypress-wait-until and cypress-file-upload)***
1. Verify added task
1. Go to Dashboard and verify added task under Notification section

## Environmental variable and data
Environment variables for staging are stored in **/config/staging.json**<br> 

This will be passed as a cli argument when starting cypress by ***cy:run:staging***<br>
This is for ***additional task #1 to setup environmental and user data***<br>

Test data are stored in **/cypress/fixtures/testData.json** which will be loaded before running specs file

