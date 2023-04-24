#!groovy 

import groovy.json.JsonSlurperClassic

node{
//     def SF_CONSUMER_KEY=env.SF_CONSUMER_KEY
       def SF_USERNAME="ashishrajbanshi70@empathetic-otter-5k58pt.com"
//     def SERVER_KEY_CREDENTALS_ID=env.SERVER_KEY_CREDENTALS_ID
       def SF_DEV_HUB_ALIAS="devHub"
       def SF_SCRATCH_ALIAS="testOrg"
    def SF_DEV_INSTANCE_URL ="https://login.salesforce.com"
    
    stage('checkout source') {
        checkout scm
    }

    //withCredentials([file(credentialsId: SERVER_KEY_CREDENTALS_ID, variable: 'server_key_file')]) {
        // stage('Install sfdx scanner'){
        //     rc = command "sfdx plugins:install @salesforce/sfdx-scanner"
        //     if (rc!=0){
        //         error 'Unable to install scanner'
        //     }
        // }
    stage("Authorize a devhub"){
        sh "sfdx auth:web:login -a ${SF_DEV_HUB_ALIAS} -r ${SF_DEV_INSTANCE_URL} 
    }        

    stage('Create Test Scratch Org'){
       sh "sfdx force:org:create --targetdevhubusername ${SF_DEV_HUB_ALIAS} --setdefaultusername --definitionfile config/project-scratch-def.json --setalias ${SF_SCRATCH_ALIAS} --wait 10 --durationdays 1"
    }
       
    stage('Generate password for test scratch org'){
       sh "sfdx force:user:password:generate --targetdevhubusername ${SF_DEV_HUB_ALIAS} --targetusername ${SF_SCRATCH_ALIAS}"
    }

    stage('Display scratch org'){
       sh "sfdx force:org:display --targetusername ciorg"
    }

    stage('Push to Test Scratch Org'){
       sh "sfdx force:source:deploy --targetusername ${SF_SCRATCH_ALIAS}"
    }
        
    stage('Assign the default user in the scratch org'){
       sh "sfdx force:user:permset:assign --permsetname ForJack"
    }

    stage("Create Package"){
       sh "sfdx force:package:create --name MovieBooking --description 'You can book movie here' --path force-app --packagetype Managed --targetdevhubusername ${SF_DEV_HUB_ALIAS}"
    }

        // stage('Create Package Version') {
        //     if (isUnix()) {
        //         output = sh returnStdout: true, script: "sfdx force:package:version:create --skipvalidation --package MovieBooking --installationkeybypass --wait 10 --json --targetdevhubusername ${SF_DEV_HUB_ALIAS}"
        //     } else {
        //         output = bat(returnStdout: true, script: "sfdx force:package:version:create --skipvalidation --package MovieBooking --installationkeybypass --wait 10 --json --targetdevhubusername ${SF_DEV_HUB_ALIAS}").trim()
        //         output = output.readLines().drop(1).join(" ")
        //     }

        //     // Wait 5 minutes for package replication.
        //     sleep 120

        //     def jsonSlurper = new JsonSlurperClassic()
        //     def response = jsonSlurper.parseText(output)

        //     PACKAGE_VERSION = response.result.SubscriberPackageVersionId

        //     response = null

        //     echo PACKAGE_VERSION
        // }


            // -------------------------------------------------------------------------
            // Create new scratch org to install package to.
            // -------------------------------------------------------------------------

        // stage('Create Package Install Scratch Org') {
        //     rc = command "sfdx force:org:create --targetdevhubusername ${SF_DEV_HUB_ALIAS} --setdefaultusername --definitionfile config/project-scratch-def.json --setalias moviebookingOrg --wait 10 --durationdays 1"
        //     if (rc != 0) {
        //         error 'Salesforce package install scratch org creation failed.'
        //     }
        // }
        
        // stage('Generate password for test scratch org'){
        //     rc = command "sfdx force:user:password:generate --targetdevhubusername ${SF_USERNAME} --targetusername moviebookingOrg"
        //     if(rc!=0){
        //         error 'Cannot generate password for scratch org'
        //     }
        // }


            // -------------------------------------------------------------------------
            // Display install scratch org info.
            // -------------------------------------------------------------------------

        // stage('Display Install Scratch Org') {
        //     rc = command "sfdx force:org:display --targetusername moviebookingOrg"
        //     if (rc != 0) {
        //         error 'Salesforce install scratch org display failed.'
        //     }
        // }
        
        // -------------------------------------------------------------------------
        // Install package in scratch org.
        // -------------------------------------------------------------------------

        // stage('Install Package In Scratch Org') {
        //     rc = command "sfdx force:package:install --package ${PACKAGE_VERSION} --targetusername moviebookingOrg --wait 10"
        //     if (rc != 0) {
        //         error 'Salesforce package install failed.'
        //     }
        // }
}
