/// <reference types="cypress"/>
import LoginPage from "../pages/LoginPage"
import Common from "../pages/Common"
describe('Common Test', () => {

    //Create a instance of Login and Common
    const loginPage = new LoginPage();
    const common = new Common();

    beforeEach(() => {
        //Precondition: go to login page and login
        loginPage.visit();
        cy.fixture('user').then((data) => {
            loginPage.login(data.standard_user, data.password);
        })
    })

    it(('Validate menu dropdown'), () => {
        //Create a dropdown list menu
        const expectedMenu = ["All Items", "About", "Logout", "Reset App State"];

        //Click on Menu icon
        common.element.menuBtn().should('be.visible').click();

        //Assert option in dropdown list
        common.element.menuItem().find('a').each(($el, index) => {
            cy.wrap($el).should('have.text', expectedMenu[index]);
        })
    })
    it(('Validate About Menu'), () => {
        common.element.menuBtn().should('be.visible').click();
        cy.fixture('url').then((data) => {
            common.element.aboutMenuItem().should('have.attr', 'href', data.saucelab);
        })
    })

    it(('Validate Logout Menu'), () => {
        common.element.menuBtn().should('be.visible').click();
        common.element.logoutMenuItem().should('be.visible').click();
        cy.fixture('url').then((data) => {
            cy.url().should('equal', data.saucedemo);
        })
    })

})