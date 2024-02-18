//<reference types="Cypress" />

class CheckoutStepTwo{

    inventoryItemsNames=()=>cy.get('.inventory_item_name');
    inventoryItemsPrices=()=>cy.get('.inventory_item_price');
    itemTotalLabel=()=>cy.get('.summary_subtotal_label');
    taxLabel=()=>cy.get('.summary_tax_label');
    totalLabel=()=>cy.get('.summary_info_label.summary_total_label');
    cancelBtn=()=>cy.get('[data-test="cancel"]');
    finishBtn=()=>cy.get('#finish');

    cancel(){
        this.cancelBtn().click();
    }

    finish(){
        this.finishBtn().click();
    }
}

export default CheckoutStepTwo;