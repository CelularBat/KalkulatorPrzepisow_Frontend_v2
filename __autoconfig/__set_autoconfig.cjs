const fs = require('fs');
const path = require('path');
const process = require('process');

const deploymentStatus = process.argv[2];

if ((!deploymentStatus) || !(deploymentStatus === 'false' || deploymentStatus === 'true') ) {
    console.log(process.argv);
    throw new Error("Expected 'true' or 'false' as argument, got: " , process.argv);
}


const configFilePath = path.join(__dirname, '__autoconfig_vars.js');

function updateDeploymentStatus(isDeployment) {
    try {
        
        const fileContent = fs.readFileSync(configFilePath, 'utf-8');

        const updatedContent = fileContent.replace(
            /const IS_DEPLOYMENT = (true|false);/,
            `const IS_DEPLOYMENT = ${isDeployment};`
        );

        fs.writeFileSync(configFilePath, updatedContent, 'utf-8');
        console.log(`Updated IS_DEPLOYMENT to ${isDeployment} successfully!`);
    } catch (error) {
        console.error('Error updating the file:', error);
    }
}


updateDeploymentStatus(deploymentStatus);
