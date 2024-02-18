import Login from '../../pages/Login';
import Inventory from '../../pages/Inventory';

describe('User Authentication', () => {

  let loginPage;
  let inventoryPage;

  before(()=>{
    loginPage=new Login();
    inventoryPage=new Inventory();
  })

  beforeEach(()=>{
    cy.visit("/");
  })

  context("given valid user credentials",()=>{
    it("redirects to the inventory page", ()=>{
      cy.fixture("loginData")
      .then(data=>{
        loginPage.setUsername(data.standard_user);
        loginPage.setPassword(data.password);
        loginPage.clickLoginBtn();
        inventoryPage.getTitle().should("contain","Products");
      })
    })
  })

  context("given no credentials",()=>{
    it("displays invalid credentials message",()=>{
      loginPage.clickLoginBtn();
      loginPage.errorMsg().should("contain","Username is required");
    })
  })

  context("given invalid user credentials",()=>{
    it("displays invaild username message",()=>{
      cy.fixture("loginData")
      .then(data=>{
        loginPage.setUsername(data.standard_user+"...");
        loginPage.setPassword(data.password);
        loginPage.clickLoginBtn();
        loginPage.errorMsg().should("contain","Username and password do not match any user in this service");
      })
    })

    it("displays invaild password message",()=>{
      cy.fixture("loginData")
      .then(data=>{
        loginPage.setUsername(data.standard_user);
        loginPage.setPassword(data.password+"....");
        loginPage.clickLoginBtn();
        loginPage.errorMsg().should("contain","Username and password do not match any user in this service");
      })
    })

    it("displays locked out message",()=>{
      cy.fixture("loginData")
      .then(data=>{
        loginPage.setUsername(data.locked_out_user);
        loginPage.setPassword(data.password);
        loginPage.clickLoginBtn();
        loginPage.errorMsg().should("contain","Sorry, this user has been locked out.");
      })
    })
  })
})