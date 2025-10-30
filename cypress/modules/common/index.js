class Common {
    // Elementos comuns da navegação
    elements = {
        navbarSignupLogin: () => cy.get('a[href="/login"]'),
        navbarLogout: () => cy.get('a[href="/logout"]'),
        navbarCart: () => cy.get('a[href="/view_cart"]')
    }

    // Ações comuns
    navegarParaHome() {
        cy.visit('/');
    }

    navegarParaLogin() {
        this.elements.navbarLogin().click();
    }

    navegarParaSignupLogin() {
        this.elements.navbarSignupLogin().click();
    }

    navegarParaCart() {
        this.elements.navbarCart().click();
    }

    fazerLogout() {
        this.elements.navbarLogout().click();
    }
}

export default new Common();