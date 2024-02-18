import Login from '../../pages/Login';
import Inventory from '../../pages/Inventory';
import Item from '../../pages/Item';

describe('Product Detail Page', () => {

  let loginPage;
  let inventoryPage;
  let itemPage;

  before(()=>{
    loginPage=new Login();
    inventoryPage=new Inventory();
    itemPage=new Item();
  })

  beforeEach(()=>{
    cy.fixture("loginData")
    .then(data=>{
        cy.visit("/");
        cy.clearLocalStorage("cart-contents");
        loginPage.login(data.standard_user,data.password);
    })
  })

  it('adds and removes item from cart and returns to inventory page',()=>{
    inventoryPage.clickOnItemName('Test.allTheThings() T-Shirt (Red)');
    inventoryPage.cartBadge().should('not.exist');

    itemPage.addToCart();
    itemPage.cartBadge().then($value=>{
      expect($value.text()).to.equal("1");
    });

    itemPage.removeFromCart();
    inventoryPage.cartBadge().should('not.exist');

    itemPage.returnsToProductList();
    inventoryPage.getTitle().should('contain','Products');
  })

})