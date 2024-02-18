//<reference types="Cypress" />
import Login from '../../pages/Login';
import Inventory from '../../pages/Inventory';
import Cart from '../../pages/Cart';
import CheckoutStepOne from '../../pages/CheckoutStepOne';
import CheckoutStepTwo from '../../pages/CheckoutStepTwo';
import CheckoutComplete from '../../pages/CheckoutComplete';

describe('Checkout flow', () => {

  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutStepOnePage;
  let checkoutStepTwoPage;
  let checkoutCompletePage;

  before(()=>{
    loginPage=new Login();
    inventoryPage=new Inventory();
    cartPage=new Cart();
    checkoutStepOnePage=new CheckoutStepOne();
    checkoutStepTwoPage=new CheckoutStepTwo();
    checkoutCompletePage=new CheckoutComplete();
  })

  beforeEach(()=>{
    cy.fixture("loginData")
    .then(data=>{
        cy.visit("/");
        cy.clearLocalStorage("cart-contents");
        loginPage.login(data.standard_user,data.password);
    })
  })

  it('cancels checkout',()=>{
    inventoryPage.addItemToCart('Test.allTheThings() T-Shirt (Red)');
        inventoryPage.addItemToCart('Sauce Labs Bike Light');
        inventoryPage.addItemToCart('Sauce Labs Fleece Jacket');
        inventoryPage.openCart();
        cartPage.checkout();
        checkoutStepOnePage.cancel();
        cartPage.title().should('contain','Your Cart');
  })

  context('given invalid personal informations',()=>{
    it('displays error message',()=>{
        inventoryPage.addItemToCart('Test.allTheThings() T-Shirt (Red)');
        inventoryPage.addItemToCart('Sauce Labs Bike Light');
        inventoryPage.addItemToCart('Sauce Labs Fleece Jacket');
        inventoryPage.openCart();
        cartPage.checkout();
        cy.url().should('contain','checkout-step-one');
        checkoutStepOnePage.title().should('contain','Checkout: Your Information');
    
        checkoutStepOnePage.setFirstName('Pera');
        checkoutStepOnePage.continue();
        checkoutStepOnePage.errorMsg().should('contain','Error: Last Name is required');

        checkoutStepOnePage.setLastName('Peric');
        checkoutStepOnePage.continue();
        checkoutStepOnePage.errorMsg().should('contain','Error: Postal Code is required');

        checkoutStepOnePage.postalCodeInputField().should('have.class', 'error');
        checkoutStepOnePage.setPostalCode('12');
        checkoutStepOnePage.clearFirstName();
        checkoutStepOnePage.continue();
        checkoutStepOnePage.errorMsg().should('contain','Error: First Name is required');

    })
  })

  context('given valid personal informations',()=>{
    it('continues to next checkout step',()=>{
        inventoryPage.addItemToCart('Sauce Labs Fleece Jacket');
        inventoryPage.openCart();
        cartPage.checkout();
        cy.url().should('contain','checkout-step-one');
        checkoutStepOnePage.title().should('contain','Checkout: Your Information');
    
        checkoutStepOnePage.setAllFields('Pera','Peric','123');
        checkoutStepOnePage.continue();
    })

    it('finishes checkout',()=>{
        const itemsNames=['Test.allTheThings() T-Shirt (Red)','Sauce Labs Bike Light','Sauce Labs Fleece Jacket']
        inventoryPage.addItemToCart(itemsNames[0]);
        inventoryPage.addItemToCart(itemsNames[1]);
        inventoryPage.addItemToCart(itemsNames[2]);
        inventoryPage.openCart();
        cartPage.checkout();
        cy.url().should('contain','checkout-step-one');
        checkoutStepOnePage.title().should('contain','Checkout: Your Information');
    
        checkoutStepOnePage.setAllFields('Pera','Peric','123');
        checkoutStepOnePage.continue();

        itemsNames.forEach(name=>checkoutStepTwoPage.inventoryItemsNames().should('contain',name));

        checkoutStepTwoPage.inventoryItemsPrices().then($prices=>{

            const prices=[...$prices].map($price=>+($price.innerText.slice(1,)))
            const sum=prices.reduce((a,b)=>a+b,0);

            checkoutStepTwoPage.itemTotalLabel().then($totalNoTax=>{
                const totalNoTaxDisplayed=+($totalNoTax.text().split('Item total: $')[1]);
                expect(sum).to.be.equal(totalNoTaxDisplayed);

                checkoutStepTwoPage.taxLabel().then($tax=>{
                    const tax=+($tax.text().split('Tax: $')[1]);

                    checkoutStepTwoPage.totalLabel().then($total=>{
                        const totalDisplayed=+($total.text().split('Total: $')[1]);
                        expect(sum+tax).to.be.equal(totalDisplayed);

                        checkoutStepTwoPage.finish();
                        checkoutCompletePage.title().should('contain','Checkout: Complete!');
                        checkoutCompletePage.completeHeader().should('contain','Thank you for your order!');
                        checkoutCompletePage.return();
                        inventoryPage.title().should('contain','Products');
                        inventoryPage.cartBadge().should('not.exist');
                    })
                })
            })
        })

    })
  })

})