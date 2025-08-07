**📋 Project Description**

This is an automated testing project built using Cypress and the Page Object Model (POM) design pattern.

Test data, such as user credentials and URLs, are separated into dedicated files for easier maintenance and scalability. (cypress/fixtures)

The project includes automated test reports generated with Mochawesome.

Video recording is enabled for all test executions.

**🚀 Installation & Setup**

Use this command to clone this reporsitory:

cd <your_directory>

git clone https://github.com/tuyetnhu213/SauceDemo


Run the following command to install Cypress:

npm init -y

npm install cypress --save-dev

npx cypress open

⚠️ Some dependencies may already exist on my machine. If your system is missing any, please install them as needed.

Some dependencies I remember:

npm install -D cypress-xpath

npm install mochawesome mochawesome-merge mochawesome-report-generator --save-dev

**🧪 Run the Tests**

To execute tests in headless mode, use:

npx cypress run


**📁 Output**

📄 Test reports are saved in: cypress/reports

🎥 Test execution videos are saved in: cypress/videos

