/// <reference types="cypress" />

import common from '../modules/common';
import login from '../modules/login';
import register from '../modules/register';
import produtos from '../modules/produtos';
import { gerarEmailUnico, gerarNomeUsuarioUnico } from '../helpers/utils';

// Test Case 15: Place Order: Register before Checkout

describe('Cenario15 Place Order: Register before Checkout', () => {
  const usuario = {
    nome: gerarNomeUsuarioUnico('Buyer'),
    email: gerarEmailUnico(),
    senha: 'Teste@123',
    dataNascimento: { dia: '1', mes: 'January', ano: '1990' },
    detalhes: {
      firstName: 'Buyer',
      lastName: 'Tester',
      company: 'QA Company',
      address: '123 Test Street',
      address2: 'Apt 456',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      zipcode: '90001',
      mobileNumber: '1234567890'
    }
  };

  beforeEach(() => {
    // 1-2. Launch + Navigate
    cy.visit('/');
  });

  it('Deve registrar, adicionar produtos, finalizar pedido e deletar a conta', () => {
    // 3. Verificar home
    cy.get('img[alt="Website for automation practice"]').should('be.visible');
    cy.title().should('include', 'Automation Exercise');

    // 4. Signup / Login
    common.navegarParaSignupLogin();

    // 5. Preencher dados de Signup inicial e criar conta
    cy.contains('h2', 'New User Signup!').should('be.visible');
    login.fazerSignup(usuario.nome, usuario.email);

    cy.contains('h2.title', /Enter Account Information/i).should('be.visible');
    register.preencherInformacoesIniciais('Mr', usuario.nome, usuario.email, usuario.senha, usuario.dataNascimento);
    register.marcarNewsletter();
    register.preencherInformacoesAdicionais(usuario.detalhes);

    // 6. Verificar 'ACCOUNT CREATED!' e continuar
    register.criarConta();
    cy.url().should('include', '/account_created');
    cy.contains('h2.title', /Account Created/i).should('be.visible');
    register.continuarAposRegistro();

    // 7. Verificar 'Logged in as username'
    cy.contains('a', new RegExp(`Logged in as ${usuario.nome}`, 'i')).should('be.visible');

    // 8. Adicionar produtos ao carrinho
    produtos.navegarParaProdutos();
    cy.url().should('include', '/products');
    cy.contains('h2', /All Products/i).should('be.visible');

    // Adiciona primeiro produto
    produtos.getListaProdutos().first().within(() => {
      cy.contains(/add to cart/i).click({ force: true });
    });

    // Modal: continuar comprando
    cy.contains('button, a', /Continue Shopping/i).should('be.visible').click();

    // Adiciona segundo produto (se existir)
    produtos.getListaProdutos().eq(1).within(() => {
      cy.contains(/add to cart/i).click({ force: true });
    });

    // Modal: ir para o carrinho
    cy.contains('a, button', /View Cart|Cart/i).click();

    // 9. Clicar no botão Cart (fallback via navbar se necessário)
    cy.url().then((url) => {
      if (!/\/view_cart/.test(url)) {
        common.navegarParaCart();
      }
    });

    // 10. Verificar página do carrinho
    cy.url().should('include', '/view_cart');
    cy.contains('b', /Shopping Cart/i).should('be.visible');

    // 11. Proceed To Checkout
    cy.contains('a, button', /Proceed To Checkout/i).click();

    // 12. Verificar Address Details e Review Your Order
    cy.contains('h2', /Address Details/i).should('be.visible');
    cy.contains('h2', /Review Your Order/i).should('be.visible');

    // 13. Comentário e Place Order
    cy.get('textarea[name="message"], textarea').first().type('Por favor, entregar em horário comercial.');
    cy.contains('a, button', /Place Order/i).click();

    // 14. Dados de pagamento
    cy.get('input[data-qa="name-on-card"], input[name="name_on_card"]').type(`${usuario.nome} Card`);
    cy.get('input[data-qa="card-number"], input[name="card_number"]').type('4111111111111111');
    cy.get('input[data-qa="cvc"], input[name="cvc"]').type('123');
    cy.get('input[data-qa="expiry-month"], input[name="expiry_month"]').type('12');
    cy.get('input[data-qa="expiry-year"], input[name="expiry_year"]').type('2030');

    // 15. Pagar e confirmar pedido
    cy.contains('button, input[type="submit"]', /Pay and Confirm Order|Pay/i).click();

    // 16. Verificar mensagem de sucesso
    cy.contains(/Your order has been placed successfully!/i).should('be.visible');

    // 17. Deletar conta
    register.deletarConta();

    // 18. Verificar 'ACCOUNT DELETED!' e continuar
    cy.url().should('include', '/delete_account');
    cy.contains('h2.title', /Account Deleted/i).should('be.visible');
    register.continuarAposRegistro();
  });
});
