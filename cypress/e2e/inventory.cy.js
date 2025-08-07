/// <reference types="cypress"/>
import LoginPage from "../pages/LoginPage"
import Inventory from "../pages/Inventory"
describe('Inventory Test', () => {

    //Create a instance of Login and Inventory
    const loginPage = new LoginPage();
    const inventory = new Inventory();

    beforeEach(() => {
        //Precondition: go to login page and login
        loginPage.visit();
        loginPage.login('standard_user', 'secret_sauce');
    })

    it(('Validate About Menu'), () => {
        inventory.element.menuBtn().should('be.visible').click();
        inventory.element.aboutMenuItem().should('be.visible').click();
        cy.url().should('eq', 'https://saucelabs.com/');
    })

    it(('Validate Logout Menu'), () => {
        inventory.element.menuBtn().should('be.visible').click();
        inventory.element.logoutMenuItem().should('be.visible').click();
        cy.url().should('eq', 'https://www.saucedemo.com/');
    })

    it('Validate product details page', () => {

        const prodList = inventory.getProdList();
        //Loop prodList array and compare value on the Details page with items in array
        cy.then(() => {
            prodList.forEach((product, index) => {
                cy.xpath("//img[@alt='" + product.name + "']").click();
                //validate detail page is navigated
                cy.url().should('include', 'inventory-item.html?id=');

                //validate src of image

                inventory.element.imgDetail().should('have.attr', 'src', product.img);
                //validate product Name, Description and Price
                inventory.element.nameDetail().should('have.text', product.name);
                inventory.element.descDetail().should('have.text', product.desc);
                inventory.element.priceDetail().should('have.text', product.price)
                inventory.element.backtoProdBtn().click();
            })
        })



    })

    it(('Validate menu dropdown'), () => {
        //Create a dropdown list menu
        const expectedMenu = ["All Items", "About", "Logout", "Reset App State"];

        //Click on Menu icon
        inventory.element.menuBtn().should('be.visible').click();

        //Assert option in dropdown list
        inventory.element.menuItem().find('a').each(($el, index) => {
            cy.wrap($el).should('have.text', expectedMenu[index]);
        })

        //Asset About button

    })

    it(('Validate button About in menu'), () => {

    })

    it('Validate number of Products', () => {
        //Get the number of ProductsItem element that should be 6
        inventory.element.productItem().should('have.length', 6);
    })

    it('Validate each number should have Picture, Name, Description, Price and Add to Cart button', () => {
        //Loop each Production Item
        inventory.element.productItem().each(($el) => {

            //Assert that each production has Image, Name, Description visible
            inventory.element.itemImg($el).should('be.visible')
            inventory.element.itemName($el).should('be.visible')
            inventory.element.itemDesc($el).should('be.visible')

            //Assert that the price should be in the corrrect format
            inventory.element.itemPrice($el).invoke('text').should('match', /^\$\d+\.\d{2}$/)
            // Regular Expression Explanation:
            // ^        → Start of string
            // \$       → Literal dollar sign ($)
            // \d+      → One or more digits (integer part)
            // \.       → Literal dot (decimal point)
            // \d{2}    → Exactly two digits (decimal part)
            // $        → End of string

            //Assert that the Button at each Production should Add to cart
            inventory.element.itemBtn($el).should('contain', 'Add to cart')

        })
    })

    it('Validate cart badge updates dynamically', () => {
        //Define a cartList
        let cartList = [];

        //Loop all products
        inventory.element.productItem().each(($el) => {
            //Click button add to cart
            inventory.element.itemBtn($el).click();
            //Assert that the text of button should be changed to Remove
            inventory.element.itemBtn($el).should('contain', 'Remove');

            //Add the Production Name to the cartList
            inventory.element.itemName($el).invoke('text').then((text) => {
                cartList.push(text);
            });
        }).then(() => {

            //After all products are clicked and cartList is filled
            //Validate the length of array equal with number of product in the cart emoji
            inventory.element.cartNumber().should('have.text', `${cartList.length}`);
        })

        //Loop all products again
        inventory.element.productItem().each(($el) => {
            //Click button add to cart
            inventory.element.itemBtn($el).click();
            //Validate that the button should be changed to Add to Cart
            inventory.element.addtoCartBtn($el).should('contain', 'Add to cart');

            //Remove the last item in the cartList
            inventory.element.itemName($el).invoke('text').then((text) => {
                cartList.filter(item => item !== text);
            });
        }).then(() => {

            //After all products are clicked and cartList is filled
            //Validate the length of array equal with number of product in the cart emoji
            inventory.element.cartNumber().should('not.exist');
        })


    })
    it('Verify the sort should have 4 options: Name (A to Z), Name (Z to A), Price (low to high), Price (high to low)', () => {
        const expectedOption = [
            { value: 'az', text: 'Name (A to Z)' },
            { value: 'za', text: 'Name (Z to A)' },
            { value: 'lohi', text: 'Price (low to high)' },
            { value: 'hilo', text: 'Price (high to low)' }
        ];
        inventory.element.sortBtn().find('option').each(($el, index) => {
            cy.wrap($el).should('have.value', expectedOption[index].value);
            cy.wrap($el).should('have.text', expectedOption[index].text);
        })

    })

    it('Verify sort function A-Z', () => {
        //Create a null prodName array
        const prodName = [];

        //Make sure the Sort Dropdown should be select A-Z as default
        inventory.element.sortBtn().should('have.value', 'az');

        //Loop each product item and add name into array
        inventory.element.productItem().each(($el) => {
            inventory.element.itemName($el).invoke('text').then((text) => {
                prodName.push(text.trim());
            });
        })

        //Sort the array by alphabet
        const sortNames = [...prodName].sort();

        //Assert that the list after and before sort should be the same
        expect(prodName).to.deep.equal(sortNames);
    })
    it('Verify sort function Z-A', () => {
        //Create a null prodName array
        const prodName = [];

        //Loop each product item and add name into array
        inventory.element.productItem().each(($el) => {
            inventory.element.itemName($el).invoke('text').then((text) => {
                prodName.push(text.trim());
            });
        })

        //Sort the array by Z-A
        const sortNames = [...prodName].sort().reverse();

        //Select sort Z-A
        inventory.element.sortBtn().select('za');

        //Loop each product item and add name into array after selecting sort
        inventory.element.productItem().each(($el) => {
            inventory.element.itemName($el).invoke('text').then((text) => {
                prodName.push(text.trim());
            });
        })
        expect(prodName).to.deep.equal(sortNames);
    })
    it('Verify sort function Price Low to High', () => {
        //Create a null prodPrice array
        const prodPrice = [];

        //Loop each product item and add price into array
        inventory.element.productItem().each(($el) => {
            inventory.element.itemPrice($el).invoke('text').then((text) => {
                prodPrice.push(parseFloat(text.replace('$', '')));
            });
        })

        //Sort the array by low to high
        const sortPrice = [...prodPrice].sort();

        //Select sort low to high
        inventory.element.sortBtn().select('lohi');

        //Loop each product item and add price into array after selecting sort
        inventory.element.productItem().each(($el) => {
            inventory.element.itemPrice($el).invoke('text').then((text) => {
                prodPrice.push(parseFloat(text.replace('$', '')));
            });
        })
        expect(prodPrice).to.deep.equal(sortPrice);
    })
    it('Verify sort function Price High to Low', () => {
        //Create a null prodPrice array
        const prodPrice = [];

        //Loop each product item and add price into array
        inventory.element.productItem().each(($el) => {
            inventory.element.itemPrice($el).invoke('text').then((text) => {
                prodPrice.push(parseFloat(text.replace('$', '')));
            });
        })

        //Sort the array by high to low
        const sortPrice = [...prodPrice].sort().reverse();

        //Select sort high to low
        inventory.element.sortBtn().select('hilo');

        //Loop each product item and add price into array after selecting sort
        inventory.element.productItem().each(($el) => {
            inventory.element.itemPrice($el).invoke('text').then((text) => {
                prodPrice.push(parseFloat(text.replace('$', '')));
            });
        })
        expect(prodPrice).to.deep.equal(sortPrice);
    })


})

