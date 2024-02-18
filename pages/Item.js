//<reference types="Cypress" />

class Item{

    itemName=()=>cy.get('.inventory_details_name');
    itemPrice=()=>cy.get('.inventory_details_price');
    addToCartButton=()=>cy.get('.btn.btn_primary.btn_small.btn_inventory');
    removeFromCartButton=()=>cy.get('.btn.btn_secondary.btn_small.btn_inventory');
    itemDesc=()=>cy.get('.inventory_details_desc');
    cartBadge=()=>cy.get(".shopping_cart_badge");
    returnBtn=()=>cy.get("#back-to-products");

    addToCart(){
        this.addToCartButton().click();
    }

    removeFromCart(){
        this.removeFromCartButton().click();
    }

    returnsToProductList(){
        this.returnBtn().click();
    }

}

export default Item;