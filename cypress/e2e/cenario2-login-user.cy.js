/// <reference types="cypress" />

import common from '../modules/common';
import login from '../modules/login';
import register from '../modules/register';
import { gerarEmailUnico, gerarNomeUsuarioUnico } from '../helpers/utils';

describe('Cenario2 Login User with correct email and password', () => {
  const usuario = {
    nome: gerarNomeUsuarioUnico('User'),
    email: gerarEmailUnico(),
    senha: 'Teste@123',
    dataNascimento: { dia: '1', mes: 'January', ano: '1990' },
    detalhes: {
      firstName: 'User',
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

  before(() => {
    // Arrange: criar um usuário válido via UI e sair (para garantir independência do teste de login)
    cy.visit('/');
    common.navegarParaSignupLogin();
    cy.contains('h2', 'New User Signup!').should('be.visible');

    // Pre-cadastro (name/email) e avanço para a tela de informações
    cy.get('input[data-qa="signup-name"]').type(usuario.nome);
    cy.get('input[data-qa="signup-email"]').type(usuario.email);
    cy.get('button[data-qa="signup-button"]').click();

    // Formulário de registro
    cy.contains('h2.title', /Enter Account Information/i).should('be.visible');
    register.preencherInformacoesIniciais('Mr', usuario.nome, usuario.email, usuario.senha, usuario.dataNascimento);
    register.marcarNewsletter();
    register.preencherInformacoesAdicionais(usuario.detalhes);
    register.criarConta();

    // Conta criada
    cy.url().should('include', '/account_created');
    cy.contains('h2.title', /Account Created/i).should('be.visible');
    register.continuarAposRegistro();

    // Verificar login e sair para preparar o cenário de login
    cy.contains('a', new RegExp(`Logged in as ${usuario.nome}`, 'i')).should('be.visible');
    common.fazerLogout();

    // Confirmar que voltou para a página de login
    cy.url().should('include', '/login');
  });

  beforeEach(() => {
    // 1-2. Launch + Navigate
    cy.visit('/');
  });

  it('Deve logar com email e senha corretos e deletar a conta', () => {
    // 3. Verificar home
    cy.get('img[alt="Website for automation practice"]').should('be.visible');
    cy.title().should('include', 'Automation Exercise');

    // 4. Ir para Signup / Login
    common.navegarParaSignupLogin();

    // 5. Verificar texto de Login
    cy.contains('h2', /Login to your account/i).should('be.visible');

    // 6. Preencher login
    login.fazerLogin(usuario.email, usuario.senha);

    // 8. Verificar "Logged in as username"
    cy.contains('a', new RegExp(`Logged in as ${usuario.nome}`, 'i'))
      .should('be.visible')
      .and('exist');

    // 9. Deletar conta
    register.deletarConta();

    // 10. Verificar "ACCOUNT DELETED!"
    cy.url().should('include', '/delete_account');
    cy.contains('h2.title', /Account Deleted/i)
      .should('be.visible')
      .and('exist');
  });
});