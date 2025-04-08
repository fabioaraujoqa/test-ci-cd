
Cypress.Commands.add('preencherForm', (nome, email, idade) => {
    if (nome) cy.get('#name').type(nome)
    if (email) cy.get('#email').type(email)
    if (idade) cy.get('#age').type(idade)
    cy.get('#test-form > button').click()
})

Cypress.Commands.add('validarCampo', (elemento, msgErro) => {
    cy.get(elemento).then(($el) => {
      const msg = $el[0].validationMessage
      expect(msg).to.include(msgErro)
    })
  })
  
