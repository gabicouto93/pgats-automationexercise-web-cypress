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

    // 6. Digitar no campo de busca e clicar em Search (via módulo)
    produtos.buscar(termo);

    // 7. Verificar título 'SEARCHED PRODUCTS'
    produtos.tituloSearchedProducts().should('be.visible');

    // 8. Verificar que os produtos listados na seção "Searched Products" estão visíveis
    produtos.getListaProdutosSearched()
      .should('exist')
      .and('have.length.greaterThan', 0)
      .each(($card) => {
        // Cada card deve estar visível e mostrar o título
        cy.wrap($card).should('be.visible')
          .find('.productinfo p').should('be.visible');
      });

    // Validação adicional: ao menos um resultado contém o termo pesquisado
    produtos.getListaProdutosSearched()
      .find('.productinfo p')
      .then(($names) => {
        const texts = [...$names].map((el) => (el.textContent || '').toLowerCase());
        expect(texts.some((t) => t.includes(termoLower)), 'ao menos um resultado contém o termo').to.be.true;
      });
  });
});