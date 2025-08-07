/// <reference types="cypress"/>
import LoginPage from "../pages/LoginPage"
import Inventory from "../pages/Inventory"
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout"
describe('Inventory Test', () => {
    const loginPage = new LoginPage();
    const inventory = new Inventory();
    const cart = new Cart();
    const checkout = new Checkout();

    beforeEach(() => {
        //Precondition: go to login page and login
        loginPage.visit();
        cy.fixture('user').then((data) => {
            loginPage.login(data.standard_user, data.password);
        })        //Add product and go to cart page 
        inventory.addtoCartProduct(1);
        inventory.element.cartBtn().should('be.visible').click();

    })
    it(('Validate that we cannot continue when missing First Name'), () => {

        //Save current cartItem
        cart.getCartItem(1).then((cartItem) => {
            //Go to Checkout page
            cart.element.checkoutBtn().click();
            cy.fixture('url').then((data) => {
                cy.url().should('eq', data.checkoutstep1);
            })

            //Click on Continure button
            checkout.element.continueBtn().click();
            checkout.element.errorMissingInf().should('have.text', 'Error: First Name is required');
        })
    })
    it(('Validate that we cannot continue when missing Last Name'), () => {

        //Save current cartItem
        cart.getCartItem(1).then((cartItem) => {
            //Go to Checkout page
            cart.element.checkoutBtn().click();
            cy.fixture('url').then((data) => {
                cy.url().should('eq', data.checkoutstep1);
            })
            const FirstName = "FirstName";
            const ZipCode = "123456";
            checkout.element.firstName().type(FirstName)
                .should('have.value', FirstName);
            checkout.element.postalCode().type(ZipCode).should('have.value', ZipCode);

            //Click on Continure button
            checkout.element.continueBtn().click();
            checkout.element.errorMissingInf().should('have.text','Error: Last Name is required');
        })
    })
    it(('Validate that we cannot continue when missing Zip/Postal Code'), () => {

        //Save current cartItem
        cart.getCartItem(1).then((cartItem) => {
            //Go to Checkout page
            cart.element.checkoutBtn().click();
            cy.fixture('url').then((data) => {
                cy.url().should('eq', data.checkoutstep1);
            })
            const FirstName = "FirstName";
            const LastName = "FirstName";
            const ZipCode = "123456";
            checkout.element.firstName().type(FirstName)
                .should('have.value', FirstName);
            checkout.element.lastName().type(LastName).should('have.value', LastName);
            //Continue
            checkout.element.continueBtn().click();
            
            checkout.element.errorMissingInf().should('have.text', 'Error: Postal Code is required');
        })
    })

    it(('Validate check out successully'), () => {

        //Save current cartItem
        cart.getCartItem(1).then((cartItem) => {
            //Go to Checkout page
            cart.element.checkoutBtn().click();
            cy.fixture('url').then((data) => {
                cy.url().should('eq', data.checkoutstep1);
            })

            //Input information in checkout step one page
            const FirstName = "FirstName";
            const LastName = "FirstName";
            const ZipCode = "123456";
            checkout.element.firstName().type(FirstName)
                .should('have.value', FirstName);
            checkout.element.lastName().type(LastName).should('have.value', LastName);
            checkout.element.postalCode().type(ZipCode).should('have.value', ZipCode);
            //Continue
            checkout.element.continueBtn().click();
            cy.fixture('url').then((data) => {
                cy.url().should('eq', data.checkoutstep2);
            })


            //Assert cartItem should equal checkoutItem
            cart.getCartItem(1).then((checkoutItem) => {
                expect(checkoutItem).to.deep.equal(cartItem);


            })

            checkout.element.finishBtn().click()
            cy.fixture('url').then((data) => {
                cy.url().should('eq', data.checkoutcompelete);
            })
            checkout.element.tksforOrdertxt();

        })








    })
})