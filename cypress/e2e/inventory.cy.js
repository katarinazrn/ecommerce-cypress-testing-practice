//<reference types="Cypress" />

import Login from '../../pages/Login';
import Inventory from '../../pages/Inventory';
import Item from '../../pages/Item';

describe('Inventory page', () => {

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

    it("opens product details page when clicked on item image",()=>{
        inventoryPage.clickOnItemImage('Sauce Labs Bike Light');
        itemPage.itemName().should('contain', 'Sauce Labs Bike Light');
    })

    it("opens product details page when clicked on item name",()=>{
        inventoryPage.clickOnItemName('Test.allTheThings() T-Shirt (Red)');
        itemPage.itemName().should('contain', 'Test.allTheThings() T-Shirt (Red)');
    })

    it("adds and removes items to cart from inventory page", ()=>{
      inventoryPage.cartBadge().should('not.exist');

      inventoryPage.addItemToCart('Sauce Labs Bike Light');
      inventoryPage.cartBadge().then($value=>{
            expect($value.text()).to.equal("1");
      });

      inventoryPage.addItemToCart('Sauce Labs Fleece Jacket');
      inventoryPage.cartBadge().then($value=>{
            expect($value.text()).to.equal("2");
      });

      inventoryPage.removeItemFromCart('Sauce Labs Fleece Jacket');
      inventoryPage.cartBadge().then($value=>{
        expect($value.text()).to.equal("1");
      });

      inventoryPage.removeItemFromCart('Sauce Labs Bike Light');
      inventoryPage.cartBadge().should('not.exist');
    })

    it("sorts products",()=>{

        inventoryPage.sortItems('za');
        inventoryPage.inventoryItemsNames().then($elements => {
            const names = [...$elements].map(el => el.innerText);
            const namesSorted=[...names];
            namesSorted.sort().reverse();
            expect(names).to.deep.equal(namesSorted);
        })

        inventoryPage.sortItems('az');
        inventoryPage.inventoryItemsNames().then($elements => {
            const names = [...$elements].map(el => el.innerText);
            const namesSorted=[...names];
            namesSorted.sort();
            expect(names).to.deep.equal(namesSorted);
        })

        inventoryPage.sortItems('lohi');
        inventoryPage.inventoryItemsPrices().then($elements => {
            const prices = [...$elements].map(el =>+(el.innerText.slice(1,)));
            const pricesSorted=[...prices];
            pricesSorted.sort((a,b)=>a-b);
            expect(prices).to.deep.equal(pricesSorted);
        })

        inventoryPage.sortItems('hilo');
        inventoryPage.inventoryItemsPrices().then($elements => {
            const prices = [...$elements].map(el =>+(el.innerText.slice(1,)));
            const pricesSorted=[...prices];
            pricesSorted.sort((a,b)=>b-a);
            expect(prices).to.deep.equal(pricesSorted);
        })
      
    })

})