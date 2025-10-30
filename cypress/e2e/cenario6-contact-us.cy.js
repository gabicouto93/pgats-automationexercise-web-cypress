/// <reference types="cypress" />

import common from '../modules/common';

// Test Case 6: Contact Us Form

describe('Cenario6 Contact Us Form', () => {
  beforeEach(() => {
    // 1-2. Launch + Navigate
    cy.visit('/');
  });

  it('Deve enviar o formulário de contato com sucesso', () => {
    // 3. Verificar home
    cy.get('img[alt="Website for automation practice"]').should('be.visible');
    cy.title().should('include', 'Automation Exercise');

    // 4. Clicar no botão 'Contact Us'
    cy.get('a[href="/contact_us"]').click();

    // 5. Verificar 'GET IN TOUCH'
    cy.contains('h2', /Get in touch/i).should('be.visible');

    // 6. Preencher nome, email, subject e message
    cy.get('input[data-qa="name"], input[name="name"]').type('Contact Tester');
    cy.get('input[data-qa="email"], input[name="email"]').type('contact.tester@test.com');
    cy.get('input[data-qa="subject"], input[name="subject"]').type('Subject de teste');
    cy.get('textarea[data-qa="message"], textarea[name="message"]').type('Mensagem de teste via Cypress.');

    // 7. Upload do arquivo (usa fixture criada)
    cy.get('input[type="file"]').selectFile('cypress/fixtures/contact-upload.txt', { force: true });

    // 8. Clicar em 'Submit'
    // 9. Clicar em OK no alerta
    cy.on('window:alert', (txt) => {
      // Apenas para registro/validação do alerta (Cypress clica OK automaticamente)
      expect(txt).to.match(/Press OK to proceed/);
    });
    cy.get('input[type="submit"], button[type="submit"], [data-qa="submit-button"]').click();

    // 10. Verificar mensagem de sucesso
    cy.contains(/Success! Your details have been submitted successfully\./i)
      .should('be.visible');

    // 11. Clicar em 'Home' e verificar que voltou à home
    cy.get('a[href="/"], a.btn.btn-success').contains(/home/i).click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    cy.get('img[alt="Website for automation practice"]').should('be.visible');
  });
});