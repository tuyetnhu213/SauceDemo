class Inventory {
    element = {

        menuBtn: () => cy.get('#react-burger-menu-btn'),
        menuItem: () => cy.get('.bm-menu'),
        productItem: () => cy.get('.inventory_item'),
        itemImg: ($el = null) => {
            if ($el) return cy.wrap($el).find('img.inventory_item_img')
            else return cy.get('img.inventory_item_img')
        },
        itemName: ($el = null) => {
            if ($el) return cy.wrap($el).find('.inventory_item_name')
            else return cy.get('.inventory_item_name')
        },
        itemName: ($el) => cy.wrap($el).find('.inventory_item_name'),
        itemDesc: ($el) => cy.wrap($el).find('.inventory_item_desc'),
        itemPrice: ($el) => cy.wrap($el).find('.inventory_item_price'),
        itemBtn: ($el) => cy.wrap($el).find('button'),
        cartNumber: () => cy.get('.shopping_cart_badge'),
        sortBtn: () => cy.get('.product_sort_container'),
        imgDetail: () => cy.xpath("//div[@class='inventory_details_img_container']/img"),
        nameDetail: () => cy.get('.inventory_details_name.large_size'),
        descDetail: () => cy.xpath("//div[@class='inventory_details_desc large_size']"),
        priceDetail: () => cy.xpath("//div[@class='inventory_details_price']"),
        backtoProdBtn: () => cy.get('#back-to-products')

    }

}
export default Inventory;

