/// <reference types="cypress" />

import produtos from '../modules/produtos';

// Test Case 9: Search Product

describe('Cenario9 Search Product', () => {
  const termo = 'Dress';
  const termoLower = termo.toLowerCase();

  beforeEach(() => {
    // 1-2. Launch + Navigate
    cy.visit('/');
  });

  it('Deve buscar um produto e listar apenas resultados relacionados', () => {
    // 3. Verificar home visível
    cy.get('img[alt="Website for automation practice"]').should('be.visible');
    cy.title().should('include', 'Automation Exercise');

    // 4. Ir para Products
    produtos.navegarParaProdutos();

    // 5. Verificar ALL PRODUCTS
    cy.url().should('include', '/products');
    cy.contains('h2', /All Products/i).should('be.visible');

    // 6. Digitar no campo de busca e clicar em Search
    cy.get('#search_product, input[name="search"]')
      .should('be.visible')
      .clear()
      .type(termo);
    cy.get('#submit_search, button[type="submit"]')
      .should('be.visible')
      .click();

    // 7. Verificar título 'SEARCHED PRODUCTS'
    cy.contains('h2', /Searched Products/i).should('be.visible');

    // 8. Verificar que todos os produtos relacionados à busca estão visíveis
    produtos.getListaProdutos()
      .should('exist')
      .and('have.length.greaterThan', 0)
      .each(($card) => {
        // Cada card deve ter um título contendo o termo pesquisado
        cy.wrap($card)
          .find('.productinfo p, .product-information h2, p')
          .first()
          .invoke('text')
          .then((txt) => {
            expect(txt.toLowerCase()).to.contain(termoLower);
          });
      });
  });
});