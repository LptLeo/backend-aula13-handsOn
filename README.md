# 🛒 Mundo Geek - API de Gerenciamento de Inventário
### 📋 Sobre o Projeto

Este projeto foi desenvolvido para atender a uma necessidade real de negócio da "Mundo Geek", uma loja especializada em itens de cultura pop que enfrentava dificuldades com o controle manual de estoque.

A solução consiste em uma API robusta e escalável que permite a organização estratégica de produtos por categorias, otimizando o gerenciamento de inventário e garantindo a confiabilidade dos dados para o proprietário.

### 🎯 Objetivos de Negócio Atendidos

- **Eficiência Operacional**: Substituição do controle manual por um sistema automatizado de CRUD.

- **Integridade de Dados**: Implementação de relacionamentos 1:N (uma categoria para muitos produtos) e validações rigorosas para evitar erros de inventário.

- **Padronização Técnica**: Desenvolvimento focado em documentação clara e arquitetura organizada, facilitando futuras expansões do sistema.

### 🧠 Decisões de Design e Abordagens

As escolhas técnicas para "Mundo Geek" procuram criar um sistema confiável, manutenível e expansível.

- **TypeScript e Express**: Escolhidos para garantir tipagem estática e desenvolvimento ágil, reduzindo erros e facilitando manutenções futuras.
- **TypeORM com PostgresSQL**: A escolha de uma ORM permite um eficiente mapeamento dos objetos para o banco de dados relacional, facilitando a gestão do relacionamento 1:N entre Categorias e Produtos.
- **Zod para Validação**: Implementado para garantir que apenas dados válidos entrem no sistemas, seguindo o requisito de um sistema robusto.
- **UUID para IDs**: Identificadores universais para evitar a exposição de enumeração de itens do estoque e facilitar integrações futuras.

### 🏗️ Divisão de Responsabilidades

A divisão de responsabilidades foi de forma a garantir um código limpo, com fácil lebilidade, manutenção e expansão.

- **Middlewares**: Primeira linha de defesa, utilizam schemas do Zod para validar a requisição antes que ela chege a lógica de negócio.
- **Controllers**: Responsáveis por serem uma espécie de ponte entre o usuário e a lógica de negócio. Recebem requisições HTTP e enviam respostas com códigos de status adequados.
- **Services**: Camada onde é aplicada a lógica, como regras de negócio.
- **Entities**: Definem a estrutura dos dados e os relacionamentos entre eles, garantindo que regras como "um produto pertence a apenas uma categoria" seja respeitado no banco de dados.

### 🚀 Instruções para Configuração Local

**_Antes de seguir as instruções, garanta que o banco de dados PostgresSQL está ativo e acessível._**

Rodando a API em seu ambiente de desenvolvimento:

1.  **Instalação**:
	Dentro da pasta do projeto, instale as dependências listadas no package.json com o comando:

        npm install

2.  **Variáveis de Ambiente**:
    Crie um arquivo `.env` em `src/config/` ou modifique os valores definidos nos arquivos `server.ts` e `src/database/dataSource.ts` e preencha com suas credenciais do PostgreSQL:

        API_PORT=6060
        POSTGRES_HOST=localhost
        POSTGRES_PORT=5432
        POSTGRES_USER=postgres
        POSTGRES_PASSWORD=123
        POSTGRES_DATABASE=mundo_geek_db
        POSTGRES_SYNCHRONIZE=true
        POSTGRES_LOGGING=true

3.  **Execução**:
    Para iniciar o servidor com nodemon e tsx, execute:

        npm run dev
