class LoginPage {
    // Define locators (elements) used on the Login Page
    elements = {
        usernameInput: () => cy.get('#user-name').should('be.visible'),
        passwordInput: () => cy.get('#password').should('be.visible'),
        loginBtn: () => cy.get('#login-button').should('be.enabled'),
        loginFailedNotification: () => cy.get('.error-message-container.error')
    }

    // Visit the Login Page with intercepting the GET request to ensure page is fully loaded
    visit() {
        cy.intercept('GET', '/').as('loginPage');
        cy.fixture('url').then((data) => {
            cy.visit(data.saucedemo);
        })
        cy.wait('@loginPage')
    }

    // Perform login action by typing username & password and clicking login button
    login(username, password) {
        this.elements.usernameInput().type(username)
        this.elements.passwordInput().type(password)
        this.elements.loginBtn().click()
    }
}

// Exporting LoginPage class for use in test files
export default LoginPage;