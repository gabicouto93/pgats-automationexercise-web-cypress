class Login {
    elements = {
        inputEmail: () => cy.get('[data-qa="login-email"]'),
        inputPassword: () => cy.get('[data-qa="login-password"]'),
        btnLogin: () => cy.get('[data-qa="login-button"]'),
        signupName: () => cy.get('[data-qa="signup-name"]'),
        signupEmail: () => cy.get('[data-qa="signup-email"]'),
        btnSignup: () => cy.get('[data-qa="signup-button"]')
    }

    fazerLogin(email, senha) {
        this.elements.inputEmail().type(email);
        this.elements.inputPassword().type(senha, { log: false }); // Ocultando senha no log
        this.elements.btnLogin().click();
    }

    fazerSignup(nome, email) {
        this.elements.signupName().type(nome);
        this.elements.signupEmail().type(email);
        this.elements.btnSignup().click();
    }
}

export default new Login();