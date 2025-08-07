/// <reference types="cypress" />
import LoginPage from "../pages/LoginPage"

describe('Login', () => {
    const loginPage = new LoginPage();
    it('Validate login successully', () => {

        loginPage.visit();
        cy.fixture('user').then((data) => {
            loginPage.login(data.standard_user, data.password);
        })
        cy.fixture('url').then((data) => {
            cy.url().should('equal', data.inventory)
        })

    })
    it('Validate login failed with invalid password', () => {

        loginPage.visit();
        cy.fixture('user').then((data) => {
            loginPage.login(data.standard_user, data.password+"1");
        })
        loginPage.elements.loginFailedNotification()
            .should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })
    it('Validate login failed with locked_out_user', () => {

        loginPage.visit();
        cy.fixture('user').then((data) => {
            loginPage.login(data.locked_out_user, data.password);
        })
        loginPage.elements.loginFailedNotification()
            .should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
    })
})