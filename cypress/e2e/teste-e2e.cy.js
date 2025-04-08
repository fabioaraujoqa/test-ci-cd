/// <reference types="cypress" />

describe('Testes End to end - QA Playground', () => {

    beforeEach(() => {
        cy.visit('playground-html')
    });
    
    it('Deve preencher o formulário com sucesso', () => {
        cy.preencherForm('Fábio', 'fabio@teste.com', 30)
        cy.get('#form-feedback').should('contain', 'Formulário enviado com sucesso!')
    });

    it('Deve exibir mensagem de erro quando não preencher o campo nome', () => {
        cy.preencherForm('', 'fabio@teste.com', 30)        
        cy.validarCampo('#name', 'Preencha este campo.')
    });

    it('Deve exibir mensagem de erro quando não preencher o campo e-mail', () => {
        cy.preencherForm('Fábio', '', 30)        
        cy.validarCampo('#email', 'Preencha este campo.')
    });

    it('Deve exibir mensagem de erro quando não preencher o campo Idade', () => {
        cy.preencherForm('Fábio', 'fabio@teste.com', '')        
        cy.validarCampo('#age', 'Preencha este campo.')
    });

    it('Deve exibir mensagem de erro quando preencher e-mail com formato inválido', () => {
        cy.preencherForm('Fábio', 'fabio.com', 30)        
        cy.validarCampo('#email', 'Inclua um "@" no endereço de e-mail.')
    });

    it('Deve ativar e validar o modo de alto contraste', () => {
        cy.get('body').should('not.have.class', 'high-contrast')
        cy.get('#toggle-contrast').click()
        cy.get('body').should('have.class', 'high-contrast')
      })


});