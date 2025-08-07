/// <reference types="cypress"/>
import LoginPage from "../pages/LoginPage";
import Inventory from "../pages/Inventory";
import Cart from "../pages/Cart";

describe('Cart Test', () => {
    const loginPage = new LoginPage();
    const inventory = new Inventory();
    const cart = new Cart();

    beforeEach(() => {
        //Precondition: go to login page and login
        loginPage.visit();
        cy.fixture('user').then((data) => {
            loginPage.login(data.standard_user, data.password);
        })    })

    it('Validate the cart should be null when there is no item selected', () => {
        inventory.element.cartBtn().should('be.visible').click();
        cy.fixture('url').then((data) => {
            cy.url().should('equal', data.cart)
        })
        cart.element.cartItem().should('not.exist');
    })

    it('Validate the cart should be updated when adding all products item', () => {

        //Add all products into cart
        inventory.element.productItem().each(($el) => {
            inventory.element.addtoCartBtn($el).click();
            inventory.element.addtoCartBtn($el).should('contain', 'Remove');

        }).then(() => {
            const prodList = inventory.getProdList();

            //Go to cart
            inventory.element.cartBtn().should('be.visible').click();

            //Assert the cartItem equal with the array Product List
            cart.element.cartItem().each(($el, index) => {
                cart.element.inventoryItemName($el)
                    .invoke('text')
                    .should('eq', prodList[index].name);
            })
        })
    })


    it('Validate the cart when add then remove product', () => {
        //add product 1st and assert data in cart
        inventory.addtoCartProduct(1);

        inventory.getProduct(1).then((prod) => {
            inventory.element.cartBtn().should('be.visible').click();
            cart.getCartItem(1).then((cart) => {
                expect(prod.name).to.equal(cart.name);
                expect(prod.desc).to.equal(cart.desc);
                expect(prod.price).to.equal(cart.price);
                expect(1).to.equal(cart.quantity);
            })
        });

        //back to inventory page
        cart.element.continueShoppingBtn().click();
        
        //add product 2nd and assert data in cart
        inventory.addtoCartProduct(2);

        inventory.getProduct(2).then((prod) => {
            inventory.element.cartBtn().should('be.visible').click();
            cart.getCartItem(2).then((cart) => {
                expect(prod.name).to.equal(cart.name);
                expect(prod.desc).to.equal(cart.desc);
                expect(prod.price).to.equal(cart.price);
                expect(1).to.equal(cart.quantity);
            })
        });

        //remove product 1 from cart
        cart.removeCart(1);
        //assert product 1 no longer in cart
        cart.element.continueShoppingBtn().click();
        inventory.getProduct(1).then((prod) => {
            inventory.element.cartBtn().should('be.visible').click();
            cart.getCartItem(1).then((cart) => {
                expect(prod.name).not.to.equal(cart.name);
            })
        });

        //continue remove product 2 from cart
        cart.removeCart(1);
        //assert no more product in the cart
        cart.element.cartItem().should('not.exist');
    })

})
