// replaceUtils.js

function replaceUtil(content) {
  // const ada = (ada)=>{
  //   //  ada
  // }
    const reg = /(\w+)(\__c)/g;
    content = content.replace(reg, `compliancequest__$1$2`);
    return content
  }

  module.exports = replaceUtil;
  