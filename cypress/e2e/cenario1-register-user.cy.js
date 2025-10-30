/// <reference types="cypress" />

import common from '../modules/common';
import register from '../modules/register';
import { gerarEmailUnico, gerarNomeUsuarioUnico } from '../helpers/utils';

describe('Cenario1 Register User', () => {
    const testData = {
        nome: gerarNomeUsuarioUnico('John'),
        senha: 'Teste@123',
        dataNascimento: {
            dia: '1',
            mes: 'January',
            ano: '1990'
        },
        detalhes: {
            firstName: 'John',
            lastName: 'Doe',
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
        // 1. Launch browser and 2. Navigate to url
        cy.visit('https://automationexercise.com');
    });

    it('Deve realizar o cadastro completo de um novo usuário', () => {
        // 3. Verify that home page is visible successfully
        cy.get('img[alt="Website for automation practice"]').should('be.visible');
        cy.title().should('include', 'Automation Exercise');

        // 4. Click on 'Signup / Login' button
        common.navegarParaSignupLogin();

        // 5. Verify 'New User Signup!' is visible
        cy.contains('h2', 'New User Signup!').should('be.visible');

        // 6 & 7. Enter name and email address and Click 'Signup' button
        const email = gerarEmailUnico();
        cy.get('input[data-qa="signup-name"]').type(testData.nome);
        cy.get('input[data-qa="signup-email"]').type(email);
        cy.get('button[data-qa="signup-button"]').click();

        // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
        cy.contains('h2', /Enter Account Information/i).should('be.visible');

        // 9. Fill details: Title, Name, Email, Password, Date of birth
        register.preencherInformacoesIniciais(
            'Mr',
            testData.nome,
            email,
            testData.senha,
            testData.dataNascimento
        );

        // 10 & 11. Select checkboxes
        register.marcarNewsletter();

        // 12. Fill details
        register.preencherInformacoesAdicionais(testData.detalhes);

        // 13. Click 'Create Account button'
        register.criarConta();

        // Aguardar URL mudar para account_created
        cy.url().should('include', '/account_created');

        // 14. Verify that 'ACCOUNT CREATED!' is visible
        cy.contains('h2.title', /Account Created/i)
          .should('be.visible')
          .and('exist');

        // 15. Click 'Continue' button
        cy.wait(1000); // Pequena espera para garantir que o botão está interativo
        register.continuarAposRegistro();

        // Aguardar URL mudar
        cy.url().should('not.include', '/account_created');

        // 16. Verify that 'Logged in as username' is visible
        cy.contains('a', new RegExp(`Logged in as ${testData.nome}`, 'i'))
          .should('be.visible')
          .and('exist');

        // 17. Click 'Delete Account' button
        register.deletarConta();

        // Aguardar URL mudar
        cy.url().should('include', '/delete_account');

        // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
        cy.contains('h2.title', /Account Deleted/i)
          .should('be.visible')
          .and('exist');

        // Pequena espera para garantir que o botão continue está interativo
        cy.wait(1000);
        register.continuarAposRegistro();
    });
});