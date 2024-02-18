//<reference types="Cypress" />

class Inventory{

    title=()=>cy.get("span.title");
    cartBadge=()=>cy.get(".shopping_cart_badge");
    cartLink=()=>cy.get('.shopping_cart_link');
    inventoryList=()=>cy.get(".inventory_list");
    inventoryItems=()=>cy.get(".inventory_item");
    inventoryItemsNames=()=>cy.get(".inventory_item .inventory_item_name");
    inventoryItemsPrices=()=>cy.get(".inventory_item .inventory_item_price");
    filterContainer=()=>cy.get("[data-test='product_sort_container']");
    inventoryItem=(name)=>cy.get(".inventory_item").contains('.inventory_item',name);
    inventoryItemImage=(name)=>this.inventoryItem(name).find(".inventory_item_img img");
    inventoryItemName=(name)=>this.inventoryItem(name).find(".inventory_item_name");
    inventoryItemAddToCartButton=(name)=>this.inventoryItem(name).find('.btn.btn_primary.btn_small.btn_inventory ');
    inventoryItemRemoveFromCartButton=(name)=>this.inventoryItem(name).find('.btn.btn_secondary.btn_small.btn_inventory');
    
    getTitle(){
        return this.title();
    }

    addItemToCart(name){
        this.inventoryItemAddToCartButton(name).click();
    }

    removeItemFromCart(name){
        this.inventoryItemRemoveFromCartButton(name).click();
    }

    sortItems(by){
        this.filterContainer().select(by);
    }

    clickOnItemName(name){
        this.inventoryItemName(name).click();
    }
    
    clickOnItemImage(name){
        this.inventoryItemImage(name).click();
    }

    openCart(){
        this.cartLink().click();
    }

}

export default Inventory;