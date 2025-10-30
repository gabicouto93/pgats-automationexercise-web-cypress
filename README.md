# Projeto de Automação com Cypress

Este projeto contém testes automatizados para o site Automation Exercise utilizando Cypress.

## 🚀 Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/)
- [Node.js](https://nodejs.org/)

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM (Node Package Manager)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd automationexercise
```

2. Instale as dependências:
```bash
npm install
```

## ⚡ Executando os Testes

Para abrir o Cypress Test Runner:
```bash
npm run cypress:open
```

Para executar os testes em modo headless:
```bash
npm run cypress:run
```

## 📁 Estrutura do Projeto

```
cypress/
├── e2e/                    # Arquivos de teste
├── fixtures/               # Arquivos de dados
├── modules/                # Módulos reutilizáveis
│   ├── common/            # Funcionalidades comuns
│   ├── login/             # Módulo de login
│   ├── register/          # Módulo de registro
│   └── produtos/          # Módulo de produtos
├── helpers/               # Funções auxiliares
└── support/               # Configurações e comandos customizados
```

## 🏗️ Padrões de Projeto

- Page Objects Pattern
- AAA (Arrange, Act, Assert)
- Data-qa attributes para seletores
- Modularização por funcionalidade

## 📝 Boas Práticas Implementadas

1. Seletores dedicados (data-qa, data-test)
2. Organização por módulos/funcionalidades
3. Estrutura AAA (Arrange, Act, Assert)
4. Separação de responsabilidades
5. Reutilização de código
6. Dados dinâmicos com timestamps
7. Testes independentes

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adicionando nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request