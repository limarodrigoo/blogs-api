
# Blogs Apo

O projeto, feito durante curso da trybe, foi meu primeiro contato com uma ORM 
(sequelize), e trata-se de uma API de um blog.


## Features

- Criar, Deletar e Listar Usuário 
- Login com geração de Token
- Criação de categoria e Listagem
- Criar, Listar, editar, deletar postagens


## Tech Stack


![sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

![nodeJs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
## Instalando Dependências

Após clonar repositório
```bash
  cd blogs-api  
  npm install
```

Você precisa estar com um servidor mySQL rodando para rodar o servidor.

Configurando a conexão:
- Crie uma arquivo .env
```bash
  touch .env  
```
## Environment Variables

Crie as váriaveis de ambiente:

`MYSQL_USER`

`MYSQL_PASSWORD`

`HOSTNAME`

`JWT_SECRET`


Rode o projeto
```bash
  npm start
```

## Rotas

#### User Router
/user
```http
  GET 
  GET /:id
  POST
  DELETE /me

```
#### Post Router
/post
```http
  GET
  GET /search
  GET /:id
  PUT /:id
  DELETE /:id

```
#### Login Router
/login
```http
  POST

```
#### Categories Router
/categories
```http
  GET 
  POST

```