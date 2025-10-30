/// <reference types="cypress" />

import common from '../modules/common';
import register from '../modules/register';
import { gerarEmailUnico, gerarNomeUsuarioUnico } from '../helpers/utils';

// Test Case 5: Register User with existing email

describe('Cenario5 Register User with existing email', () => {
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
    // Arrange: criar previamente um usuário válido (para garantir que o email exista)
    cy.visit('/');
    common.navegarParaSignupLogin();
    cy.contains('h2', 'New User Signup!').should('be.visible');

    // Pré-cadastro (name/email)
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

    // Sair para voltar ao estado deslogado
    cy.contains('a', new RegExp(`Logged in as ${usuario.nome}`, 'i')).should('be.visible');
    // O botão de logout fica no módulo common
    // Reutilizando a função existente
    // Evita dependência entre testes
    common.fazerLogout();
    cy.url().should('include', '/login');
  });

  beforeEach(() => {
    // 1-2. Launch + Navigate
    cy.visit('/');
  });

  it('Deve exibir erro ao tentar cadastrar com email já existente', () => {
    // 3. Verificar home
    cy.get('img[alt="Website for automation practice"]').should('be.visible');
    cy.title().should('include', 'Automation Exercise');

    // 4. Ir para Signup / Login
    common.navegarParaSignupLogin();

    // 5. Verificar 'New User Signup!'
    cy.contains('h2', 'New User Signup!').should('be.visible');

    // 6. Informar nome e email já registrado
    const outroNome = gerarNomeUsuarioUnico('User');
    cy.get('input[data-qa="signup-name"]').type(outroNome);
    cy.get('input[data-qa="signup-email"]').type(usuario.email);

    // 7. Clicar em 'Signup'
    cy.get('button[data-qa="signup-button"]').click();

    // 8. Verificar erro
    cy.contains(/Email Address already exist!/i)
      .should('be.visible');
  });
});