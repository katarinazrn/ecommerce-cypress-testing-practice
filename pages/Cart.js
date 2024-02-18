class Cart{

    title=()=>cy.get('.title');
    continueShoppingButton=()=>cy.get('[data-test="continue-shopping"]');
    checkoutButton=()=>cy.get('[data-test="checkout"]');
    cartBadge=()=>cy.get(".shopping_cart_badge");
    cartList=()=>cy.get('.cart_list');
    cartItems=()=>cy.get('.cart_item');
    cartItem=(name)=>cy.get(".cart_item").contains('.cart_item',name);

    removeBtnSelector=".btn.btn_secondary.btn_small.cart_button";


    continueShopping(){
        this.continueShoppingButton().click();
    }

    checkout(){
        this.checkoutButton().click();
    }

    removeAllItems(){
        this.cartItems().find(this.removeBtnSelector).each($item=>$item.click())
    }

    removeItem(name){
        this.cartItem(name).find(this.removeBtnSelector).click();
    }
}

export default Cart;