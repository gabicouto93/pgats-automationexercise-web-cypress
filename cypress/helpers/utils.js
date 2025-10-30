// Função para gerar email único usando timestamp
export const gerarEmailUnico = () => {
    const timestamp = new Date().getTime();
    return `qatester${timestamp}@test.com`;
};

// Função para gerar nome de usuário único
export const gerarNomeUsuarioUnico = (prefixo = 'QATester') => {
    const timestamp = new Date().getTime();
    return `${prefixo}${timestamp}`;
};

// Função para validar URL e conteúdo
export const validarPaginaEConteudo = (urlPath, conteudoEsperado) => {
    cy.url().should('include', urlPath);
    cy.contains(conteudoEsperado).should('be.visible');
};