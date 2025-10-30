// Função para gerar email único usando timestamp
export const gerarEmailUnico = () => {
    const timestamp = Date.now();
    const rand = Math.floor(Math.random() * 1_000_000);
    return `qatester${timestamp}${rand}@test.com`;
};

// Função para gerar nome de usuário único
export const gerarNomeUsuarioUnico = (prefixo = 'QATester') => {
    const timestamp = Date.now();
    const rand = Math.floor(Math.random() * 1_000_000);
    return `${prefixo}${timestamp}${rand}`;
};

// Função para validar URL e conteúdo
export const validarPaginaEConteudo = (urlPath, conteudoEsperado) => {
    cy.url().should('include', urlPath);
    cy.contains(conteudoEsperado).should('be.visible');
};