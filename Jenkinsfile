#!groovy 

import groovy.json.JsonSlurperClassic

node{
    def SF_CONSUMER_KEY=env.SF_CONSUMER_KEY
    def SF_USERNAME=env.SF_USERNAME
    def SERVER_KEY_CREDENTALS_ID=env.SERVER_KEY_CREDENTALS_ID
    def SF_INSTANCE_URL = env.SF_INSTANCE_URL ?: "https://login.salesforce.com"
    
    println 'Key is'
    println SF_CONSUMER_KEY
    println SERVER_KEY_CREDENTALS_ID
    println SF_USERNAME
    println SF_INSTANCE_URL

    stage('checkout source') {
        checkout scm
    }

    withCredentials([file(credentialsId: SERVER_KEY_CREDENTALS_ID, variable: 'server_key_file')]) {
        stage('Authorize DevHub') {
            rc = command "sfdx force:auth:jwt:grant --instanceurl ${SF_INSTANCE_URL} --clientid ${SF_CONSUMER_KEY} --username ${SF_USERNAME} --jwtkeyfile ${server_key_file} --setdefaultdevhubusername --setalias HubOrg"
            if (rc != 0) {
                error 'Salesforce dev hub org authorization failed.'
            }
        }

        stage('Create Test Scratch Org'){
            rc = command "sfdx force:org:create --targetdevhubusername HubOrg --setdefaultusername --definitionfile --definitionfile ./config/project-scratch-def.json --setalias ciorg --wait 10 --durationdays 1"
            if (rc != 0){
                error 'Salesforce test scratch org creation failed.'
            }
        }

        stage('Display Test Scratch Org'){
            rc = command "sfdx force:source:push --targetusername ciorg"
            if (rc != 0){
                error 'Salesforce push to test scratch org failed.'
            }
        }
    }
}

def command(script) {
    if (isUnix()) {
        return sh(returnStatus: true, script: script);
    } else {
        return bat(returnStatus: true, script: script);
    }
}
