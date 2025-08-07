class Common {
    element = {
        menuBtn: () => cy.get('#react-burger-menu-btn'),
        menuItem: () => cy.get('.bm-menu'),
        aboutMenuItem: () => cy.xpath("//a[.='About']"),
        logoutMenuItem: () => cy.xpath("//a[.='Logout']"),
        resetAppSateMenuItem: () => cy.xpath("//a[.='Reset App State']")
    }
} export default Common;