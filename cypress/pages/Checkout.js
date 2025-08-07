class Checkout {
    element = {
        firstName: () => cy.get('#first-name'),
        lastName: () => cy.get('#last-name'),
        postalCode: () => cy.get('#postal-code'),
        continueBtn: () => cy.get('#continue'),
        errorMissingInf: () => cy.get('.error-message-container.error'),
        subtotal: () => cy.get('.summary_subtotal_label'),
        finishBtn: () => cy.get('#finish'),
        cancelBtn: () => cy.get('#cancel'),
        tksforOrdertxt: () => cy.get('.complete-header').should('have.text','Thank you for your order!')
    }
}
export default Checkout;