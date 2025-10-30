/// <reference types="cypress" />

// Test Case 8: Verify All Products and product detail page

describe('Cenario8 Verify All Products and product detail page', () => {
  beforeEach(() => {
    // 1-2. Launch + Navigate
    cy.visit('/');
  });

  it('Deve listar produtos e validar a página de detalhes do primeiro produto', () => {
    // 3. Verificar home visível
    cy.get('img[alt="Website for automation practice"]').should('be.visible');
    cy.title().should('include', 'Automation Exercise');

    // 4. Clicar no botão 'Products'
    cy.get('a[href="/products"]').click();

    // 5. Verificar navegação para ALL PRODUCTS
    cy.url().should('include', '/products');
    cy.contains('h2', /All Products/i).should('be.visible');

    // 6. Verificar lista de produtos visível
    cy.get('.features_items .product-image-wrapper')
      .should('exist')
      .and('have.length.greaterThan', 0);

    // 7. Clicar em 'View Product' do primeiro produto
    cy.get('.features_items .product-image-wrapper')
      .first()
      .within(() => {
        cy.contains(/view product/i).click();
      });

    // 8. Usuário vai para a página de detalhes
    cy.url().should('include', '/product_details/');

    // 9. Validar detalhes visíveis
    // Nome do produto
    cy.get('.product-information h2')
      .should('be.visible')
      .and(($h2) => {
        expect($h2.text().trim()).to.have.length.greaterThan(0);
      });

    // Categoria
    cy.get('.product-information p')
      .contains(/Category:/i)
      .should('be.visible');

    // Preço (geralmente aparece como "Rs. 500")
    cy.get('.product-information span')
      .then(($spans) => {
        const hasRs = [...$spans].some((el) => /Rs\./i.test(el.textContent || ''));
        expect(hasRs, 'exibe preço com Rs.').to.be.true;
      });

    // Disponibilidade, Condição, Marca
    cy.get('.product-information p').contains(/Availability:/i).should('be.visible');
    cy.get('.product-information p').contains(/Condition:/i).should('be.visible');
    cy.get('.product-information p').contains(/Brand:/i).should('be.visible');
  });
});