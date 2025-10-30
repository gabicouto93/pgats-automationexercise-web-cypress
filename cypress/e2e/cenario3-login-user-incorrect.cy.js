/// <reference types="cypress" />

import common from '../modules/common';
import login from '../modules/login';
import { gerarEmailUnico } from '../helpers/utils';

// Test Case 3: Login User with incorrect email and password

describe('Cenario3 Login User with incorrect email and password', () => {
  beforeEach(() => {
    // 1-2. Launch + Navigate
    cy.visit('/');
  });

  it('Deve exibir erro ao tentar logar com credenciais inválidas', () => {
    // 3. Verificar home
    cy.get('img[alt="Website for automation practice"]').should('be.visible');
    cy.title().should('include', 'Automation Exercise');

    // 4. Ir para Signup / Login
    common.navegarParaSignupLogin();

    // 5. Verificar texto de Login
    cy.contains('h2', /Login to your account/i).should('be.visible');

    // 6. Informar email e senha incorretos
    const emailInvalido = gerarEmailUnico();
    const senhaInvalida = 'SenhaInvalida@123';
    login.fazerLogin(emailInvalido, senhaInvalida);

    // 7. Clicar no botão de login já ocorre dentro do módulo de login

    // 8. Verificar mensagem de erro
    cy.contains(/Your email or password is incorrect!/i)
      .should('be.visible');
  });
});