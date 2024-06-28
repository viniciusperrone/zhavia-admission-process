# Plataforma de Gerenciamento de Conteúdo para Blogs

## Requisitos Técnicos

- Frontend: NextJS
- Backend: Node.js (Express)
- Banco de Dados: MariaDB (relacional) e Elasticsearch (não relacional)
- Metodologia: TDD

## Implementação Atual
### Backend

#### Tecnologias usadas
- Node.js
- Express
- MariaDB
- Typescript

#### Estrutura de Projeto

O backend está organizado em camadas de `domain`, `services` e `infra`, atendendo uma escalabilidade e modularização. Segue a seguinte estrutura de pasta

```bash
/src
  /@types/express
  /config
    auth.ts
  /modules
    /articles
      /domain
        /models
          IArticle.ts
          ICreateArticle.ts
          IUpdateArticle.ts
        /repositories
          IArticleRepository.ts
      /infra
        /http
          /controllers
            ArticleController.ts 
          /routes
            articles.routes.ts
        /typeorm
          /entities
            Article.ts
          /repositories
            ArticleRepository.ts
      /services
        CreateArticleService.ts
        DeleteArticleService.ts
        ListArticleService.ts
        ShowArticleService.ts
        UpdateArticleService.ts
    /users
      /domain
      /infra
      /services
  /shared
    /container
      index.ts
    /errors
      AppError.ts
    /infra
      /http
        /middlewares
          isAuthenticated.ts
        /routes
          index.ts
        server.ts
      /typeorm
        /migrations
        index.ts
```

#### Funcionalidades implementadas

1. CRUD de Artigos
2. Autenticação de Usuários
