class Produtos {
  elements = {
    linkProducts: () => cy.get('a[href="/products"]'),
    listaProdutos: () => cy.get('.features_items .product-image-wrapper'),
    campoBusca: () => cy.get('#search_product, input[name="search"]'),
    botaoBuscar: () => cy.get('#submit_search, button[type="submit"]'),

    // Detalhes do produto
    nomeProduto: () => cy.get('.product-information h2'),
    paragrafosInfo: () => cy.get('.product-information p'),
    spansInfo: () => cy.get('.product-information span'),
  };

  navegarParaProdutos() {
    this.elements.linkProducts().click();
  }

  getListaProdutos() {
    return this.elements.listaProdutos();
  }

  abrirPrimeiroProduto() {
    this.elements.listaProdutos()
      .first()
      .within(() => {
        cy.contains(/view product/i).click();
      });
  }

  // Busca
  preencherBusca(termo) {
    this.elements.campoBusca()
      .should('be.visible')
      .clear()
      .type(termo);
  }

  executarBusca() {
    this.elements.botaoBuscar()
      .should('be.visible')
      .click();
  }

  buscar(termo) {
    this.preencherBusca(termo);
    this.executarBusca();
  }

  tituloSearchedProducts() {
    return cy.contains('h2', /Searched Products/i);
  }

  getResultados() {
    return this.elements.listaProdutos();
  }

  // Getters para a página de detalhes
  getNomeProduto() {
    return this.elements.nomeProduto();
  }

  getParagrafosInfo() {
    return this.elements.paragrafosInfo();
  }

  getSpansInfo() {
    return this.elements.spansInfo();
  }
}

export default new Produtos();