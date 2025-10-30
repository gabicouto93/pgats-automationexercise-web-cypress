class Register {
    elements = {
        // Elementos da página de registro
        titleMr: () => cy.get('#id_gender1'),
    password: () => cy.get('input[data-qa="password"], input#password, input[name="password"]'),
        days: () => cy.get('#days'),
        months: () => cy.get('#months'),
        years: () => cy.get('#years'),
        newsletter: () => cy.get('#newsletter'),
        specialOffers: () => cy.get('#optin'),
        firstName: () => cy.get('input[data-qa="first_name"]'),
        lastName: () => cy.get('input[data-qa="last_name"]'),
        company: () => cy.get('input[data-qa="company"]'),
        address: () => cy.get('input[data-qa="address"]'),
        address2: () => cy.get('input[data-qa="address2"]'),
        country: () => cy.get('#country'),
        state: () => cy.get('input[data-qa="state"]'),
        city: () => cy.get('input[data-qa="city"]'),
        zipcode: () => cy.get('input[data-qa="zipcode"]'),
        mobile_number: () => cy.get('input[data-qa="mobile_number"]'),
        createAccountButton: () => cy.get('button[data-qa="create-account"]'),
        continueButton: () => cy.get('a[data-qa="continue-button"]'),
        deleteAccount: () => cy.get('a[href="/delete_account"]')
    }

    preencherInformacoesIniciais(titulo, nome, email, senha, dataNascimento) {
        // Garantir que estamos na página correta e que campos do formulário estão visíveis
        cy.url().should('include', '/signup');
        this.elements.password().should('be.visible');

        this.elements.titleMr().click();
        this.elements.password().type(senha, { log: false });
        
        // Preenchendo data de nascimento
        this.elements.days().should('be.visible').select(dataNascimento.dia);
        this.elements.months().should('be.visible').select(dataNascimento.mes);
        this.elements.years().should('be.visible').select(dataNascimento.ano);
    }

    marcarNewsletter() {
        this.elements.newsletter().check();
        this.elements.specialOffers().check();
    }

    preencherInformacoesAdicionais(dados) {
        // Garantir que cada elemento está visível antes de interagir
        this.elements.firstName().should('be.visible').type(dados.firstName, { delay: 50 });
        this.elements.lastName().should('be.visible').type(dados.lastName, { delay: 50 });
        this.elements.company().should('be.visible').type(dados.company, { delay: 50 });
        this.elements.address().should('be.visible').type(dados.address, { delay: 50 });
        this.elements.address2().should('be.visible').type(dados.address2, { delay: 50 });
        this.elements.country().should('be.visible').select(dados.country);
        this.elements.state().should('be.visible').type(dados.state, { delay: 50 });
        this.elements.city().should('be.visible').type(dados.city, { delay: 50 });
        this.elements.zipcode().should('be.visible').type(dados.zipcode, { delay: 50 });
        this.elements.mobile_number().should('be.visible').type(dados.mobileNumber, { delay: 50 });
    }

    criarConta() {
        this.elements.createAccountButton().click();
    }

    continuarAposRegistro() {
        this.elements.continueButton().click();
    }

    deletarConta() {
        this.elements.deleteAccount()
            .should('be.visible')
            .and('not.be.disabled')
            .click();
    }

    continuarAposRegistro() {
        this.elements.continueButton()
            .should('be.visible')
            .and('not.be.disabled')
            .click();
    }
}

export default new Register();