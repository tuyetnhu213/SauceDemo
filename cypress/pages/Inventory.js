class Inventory {
    element = {

        cartBtn: () => cy.get('.shopping_cart_container'),

        menuBtn: () => cy.get('#react-burger-menu-btn'),
        menuItem: () => cy.get('.bm-menu'),
        aboutMenuItem: () => cy.xpath("//a[.='About']"),
        logoutMenuItem: () => cy.xpath("//a[.='Logout']"),
        resetAppSateMenuItem: () => cy.xpath("//a[.='Reset App State']"),


        productItem: (i = null) => {
            if (!i) return cy.get('.inventory_item');
            else return cy.xpath("(//div[@class='inventory_item'])[" + i + "]");
        },

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
        addtoCartBtn: ($el) => cy.wrap($el).find('button'),
        cartNumber: () => cy.get('.shopping_cart_badge'),
        sortBtn: () => cy.get('.product_sort_container'),
        imgDetail: () => cy.get('.inventory_details_img'),
        nameDetail: () => cy.get('.inventory_details_name.large_size'),
        descDetail: () => cy.xpath("//div[@class='inventory_details_desc large_size']"),
        priceDetail: () => cy.xpath("//div[@class='inventory_details_price']"),
        backtoProdBtn: () => cy.get('#back-to-products')

    }
    getProdList(length = null) {
        //Create prodList array and push product item into array
        const prodList = [];

        this.element.productItem().each(($el) => {
            this.element.itemName($el).invoke('text').then((prodName) => {
                this.element.itemDesc($el).invoke('text').then((prodDesc) => {
                    this.element.itemImg($el).invoke('attr', 'src').then((prodImg) => {
                        this.element.itemPrice($el).invoke('text').then((prodPrice) => {
                            prodList.push({
                                name: prodName,
                                desc: prodDesc,
                                img: prodImg,
                                price: prodPrice
                            })
                        });
                    });
                });
            });
        })
        return prodList;
    }
    getProduct(i) {
        let prod = {};

        return this.element.productItem(i).then(($el) => {
            cy.wrap($el).find('.inventory_item_img img')
                .invoke('attr', 'src')
                .then((src) => {
                    prod.img = src;
                });

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

            return cy.wrap(null).then(() => prod);
        });
    }

    addtoCartProduct(i) {
        this.element.productItem(i).within(() => {
            cy.get('button').click();
        })
    }

}
export default Inventory;

