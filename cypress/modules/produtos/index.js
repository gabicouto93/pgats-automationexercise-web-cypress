class Produtos {
  elements = {
    linkProducts: () => cy.get('a[href="/products"]'),
    listaProdutos: () => cy.get('.features_items .product-image-wrapper'),

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