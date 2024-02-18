class Login{

    usernameInput=()=>cy.get("#user-name");
    passwordInput=()=>cy.get("#password");
    loginBtn=()=>cy.get("#login-button");
    errorMsg=()=>cy.get("h3[data-test='error']");

    setUsername(username){
        this.usernameInput().type(username);
    }

    setPassword(password){
        this.passwordInput().type(password);
    }

    clickLoginBtn(){
        this.loginBtn().click();
    }

    login(username,password){
        this.setUsername(username);
        this.setPassword(password);
        this.clickLoginBtn();
    }

}

export default Login;