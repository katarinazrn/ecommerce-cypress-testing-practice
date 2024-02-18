import Login from '../../pages/Login';
import Inventory from '../../pages/Inventory';
import Cart from '../../pages/Cart';

describe('Managing cart', () => {

  let loginPage;
  let inventoryPage;
  let cartPage;

  before(()=>{
    loginPage=new Login();
    inventoryPage=new Inventory();
    cartPage=new Cart();
  })

  beforeEach(()=>{
    cy.fixture("loginData")
    .then(data=>{
        cy.visit("/");
        cy.clearLocalStorage("cart-contents");
        loginPage.login(data.standard_user,data.password);
    })
  })

  it('adds and removes items from cart and returns to inventory page',()=>{
    inventoryPage.addItemToCart('Test.allTheThings() T-Shirt (Red)');
    inventoryPage.addItemToCart('Sauce Labs Bike Light');
    inventoryPage.addItemToCart('Sauce Labs Fleece Jacket');

    inventoryPage.openCart();
    cy.url().should("contain",'cart');

    cartPage.cartBadge().then($value=>{
      expect($value.text()).to.equal("3");
    });

    cartPage.removeItem('Sauce Labs Bike Light');
    cartPage.cartBadge().then($value=>{
      expect($value.text()).to.equal("2");
    });
    cartPage.cartItems().should('have.length',2);
    cartPage.cartItems().should('not.contain','Sauce Labs Bike Light');
    cartPage.cartItems().should('contain','Test.allTheThings() T-Shirt (Red)');
    cartPage.cartItems().should('contain','Sauce Labs Fleece Jacket');

    cartPage.continueShopping();
    inventoryPage.title().should('contain','Products');
    inventoryPage.addItemToCart('Sauce Labs Bike Light');
    inventoryPage.openCart();
    cy.url().should("contain",'cart');
    cartPage.cartItems().should('have.length',3);

    cartPage.removeAllItems();
    inventoryPage.cartBadge().should('not.exist');
    cartPage.cartItems().should('have.length',0);
    cartPage.cartList().should('not.contain','Sauce Labs Bike Light');
    cartPage.cartList().should('not.contain','Test.allTheThings() T-Shirt (Red)');
    cartPage.cartList().should('not.contain','Sauce Labs Fleece Jacket');

  })

})