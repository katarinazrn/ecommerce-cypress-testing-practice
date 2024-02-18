class CheckoutComplete{

    title=()=>cy.get('.title');
    completeHeader=()=>cy.get('.complete-header');
    backBtn=()=>cy.get('#back-to-products');

    return(){
        this.backBtn().click();
    }

}

export default CheckoutComplete;