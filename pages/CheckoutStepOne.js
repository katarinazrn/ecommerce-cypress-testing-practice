//<reference types="Cypress" />

class CheckoutStepOne{

    firstNameInputField=()=>cy.get("[data-test='firstName']");
    lastNameInputField=()=>cy.get("[data-test='lastName']");
    postalCodeInputField=()=>cy.get("[data-test='postalCode']");
    continueBtn=()=>cy.get('[data-test="continue"]')
    cancelBtn=()=>cy.get("#cancel");
    errorMsg=()=>cy.get("[data-test='error']")
    title=()=>cy.get('.title');


    setFirstName(firstName){
        this.firstNameInputField().type(firstName);
    }

    setLastName(lastName){
        this.lastNameInputField().type(lastName);
    }

    setPostalCode(postalCode){
        this.postalCodeInputField().type(postalCode);
    }

    setAllFields(firstName,lastName,postalCode){
        this.firstNameInputField().type(firstName);
        this.lastNameInputField().type(lastName);
        this.postalCodeInputField().type(postalCode);
    }

    clearFirstName(){
        this.firstNameInputField().clear();
    }

    clearLastName(){
        this.lastNameInputField().clear();
    }

    clearPostalCode(){
        this.postalCodeInputField().clear();
    }

    cancel(){
        this.cancelBtn().click();
    }

    continue(){
        this.continueBtn().click();
    }

}

export default CheckoutStepOne;