/// <reference types="cypress" />

import { gerarEmailUnico } from '../helpers/utils';

// Test Case 10: Verify Subscription in home page

describe('Cenario10 Verify Subscription in home page', () => {
  beforeEach(() => {
    // 1-2. Launch + Navigate
    cy.visit('/');
  });

  it('Deve realizar a inscrição com sucesso no footer', () => {
    // 3. Verificar home visível
    cy.get('img[alt="Website for automation practice"]').should('be.visible');
    cy.title().should('include', 'Automation Exercise');

    // 4. Scroll down to footer
    cy.scrollTo('bottom');

    // 5. Verificar texto 'SUBSCRIPTION'
    cy.contains('h2', /subscription/i).should('be.visible');

    // 6. Informar email e clicar no botão
    const email = gerarEmailUnico();

    // Campo de email (site tem id com pequeno typo: #susbscribe_email)
    cy.get('#susbscribe_email, #subscribe_email, input[type="email"]')
      .first()
      .should('be.visible')
      .clear()
      .type(email);

    // Botão (seta) de submit
    cy.get('#subscribe, button[type="submit"], .fa-arrow-circle-o-right')
      .first()
      .click();

    // 7. Verificar mensagem de sucesso
    cy.contains(/You have been successfully subscribed!/i)
      .should('be.visible');
  });
});