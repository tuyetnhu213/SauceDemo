class Cart {
    element = {
        cartItem: (i = null) => {
            if (!i) return cy.get('.cart_item');
            else return cy.xpath("(//div[@class='cart_item'])[" + i + "]");
        },
        name: () => cy.get('.inventory_item_name'),
        desc: () => cy.get('.inventory_item_desc'),
        price: () => cy.get('.inventory_item_price'),
        quantity: () => cy.get('.cart_quantity'), 
        inventoryItemName: ($el) => cy.wrap($el).find('.inventory_item_name'),
        continueShoppingBtn: () => cy.get('#continue-shopping')

    }

    getCartItem(i) {
        let prod = {};

        return this.element.cartItem(i).then(($el) => {
            cy.wrap($el).find('.inventory_item_name')
                .invoke('text')
                .then((text) => {
                    prod.name = text;
                });

            cy.wrap($el).find('.inventory_item_price')
                .invoke('text')
                .then((text) => {
                    prod.price = text;
                });

            cy.wrap($el).find('.inventory_item_desc')
                .invoke('text')
                .then((text) => {
                    prod.desc = text;
                });
            prod.quantity = 1;
            return cy.wrap(null).then(() => prod);
        });
    }
    removeCart(i) {
        this.element.cartItem(i).then(($el) => {
            cy.wrap($el).find('button').click();
        })
    }

    getAllCartItems() {
        cartList = [];
        this.element.cartItem().each(($el) => {
            cartList.push(this.getCartItem($el);
        })
    }
}
export default Cart;