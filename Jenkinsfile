#!groovy 

import groovy.json.JsonSlurperClassic

node{
    def SF_CONSUMER_KEY=env.SF_CONSUMER_KEY
    def SF_USERNAME=env.SF_USERNAME
    def SERVER_KEY_CREDENTALS_ID=env.SERVER_KEY_CREDENTALS_ID
    def SF_DEV_HUB_ALIAS=env.SF_DEV_HUB_ALIAS
    def SF_SCRATCH_ALIAS=env.SF_SCRATCH_ALIAS
    def SF_INSTANCE_URL = env.SF_INSTANCE_URL ?: "https://login.salesforce.com"
    
    println 'Key is'
    println SF_CONSUMER_KEY
    println SERVER_KEY_CREDENTALS_ID
    println SF_USERNAME
    println SF_DEV_HUB_ALIAS
    println SF_INSTANCE_URL

    stage('checkout source') {
        checkout scm
    }

    withCredentials([file(credentialsId: SERVER_KEY_CREDENTALS_ID, variable: 'server_key_file')]) {
        stage('Logout from devhub'){
            rc=command "sfdx force:auth:logout -p -u ${SF_USERNAME}"
            if (rc!=0){
                error 'Unable to logout.'
            }
        }
        
        stage('Authorize DevHub') {
            rc = command "sfdx force:auth:jwt:grant --instanceurl ${SF_INSTANCE_URL} --clientid ${SF_CONSUMER_KEY} --username ${SF_USERNAME} --jwtkeyfile ${server_key_file} --setdefaultdevhubusername --setalias ${SF_DEV_HUB_ALIAS}"
            if (rc != 0) {
                error 'Salesforce dev hub org authorization failed.'
            }
        }

        stage('View all orgs'){
            rc=command "sfdx force:org:list"
            if (rc!=0){
                error 'Unable to view all orgs.'
            }
        }

        stage('Delete Scratch org'){
            rc = command "sfdx force:org:delete --targetusername ciorg --noprompt"
            if (rc != 0){
                error 'Delete test scratch org.'
            }
        }

        stage('Create Test Scratch Org'){
            try{
                rc = command "sfdx force:org:create --targetdevhubusername ${SF_DEV_HUB_ALIAS} --setdefaultusername --definitionfile config/project-scratch-def.json --setalias ${SF_SCRATCH_ALIAS} --wait 10 --durationdays 1"
                if (rc != 0){
                    error 'Salesforce test scratch org creation failed.'
                }
            }
            catch (err){
                echo '${err}'
            }
        }
        stage('Generate password for test scratch org'){
            rc = command "sfdx force:user:password:generate --targetdevhubusername ${SF_USERNAME} --targetusername ciorg --onbehalfof ${SF_SCRATCH_ALIAS}"
            if(rc!=0){
                error 'Cannot generate password for scratch org'
            }
        }

        stage('Display scratch org'){
            rc = command "sfdx force:org:display --targetusername ${SF_SCRATCH_ALIAS}"
            if (rc!=0){
                error 'Canot display password for scratch org'
            }
        }

        stage('Push to Test Scratch Org'){
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
