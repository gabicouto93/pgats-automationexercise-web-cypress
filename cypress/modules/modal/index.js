class Modal {
  elements = {
    modal: () => cy.get('#cartModal'),
    btnContinueShopping: () => cy.get('#cartModal').contains(/Continue Shopping/i),
    btnViewCart: () => cy.get('#cartModal').contains(/View Cart/i),
  }

  esperarVisivel() {
    this.elements.modal().should('be.visible')
  }

  esperarFechado() {
    this.elements.modal().should('not.be.visible')
  }

  continuarComprando() {
    this.esperarVisivel()
    this.elements.btnContinueShopping().should('be.visible').click()
    this.esperarFechado()
  }

  irParaCarrinho() {
    this.esperarVisivel()
    this.elements.btnViewCart().should('be.visible').click({ force: true })
  }
}

export default new Modal()
