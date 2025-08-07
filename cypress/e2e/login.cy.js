/// <reference types="cypress" />
import LoginPage from "../pages/LoginPage"

describe('Login', () => {
    const loginPage = new LoginPage();
    it('should be login successully', () => {
        
        loginPage.visit();
        loginPage.login('standard_user', 'secret_sauce');
        cy.url().should('equal','https://www.saucedemo.com/inventory.html')
    })
    it('should be login failed', () => {

        loginPage.visit();
        loginPage.login('standard_use', 'secret_sauce');
        loginPage.elements.loginFailedNotification().should('be.visible')
    })
})