STRING_ENV =env.STRING_ENV
node(){
         def projectJson = readJSON file: 'sfdx-project.json';
           def  license = projectJson.replacements;
        license.replaceWithEnv = STRING_ENV;
            writeJSON file: 'sfdx-project.json', json: projectJson, pretty: 4;
}
