# teste-inicie-educacao
Teste de admissão para a empresa Inicie Educação

## Do que se trata?
Um projeto feito para um teste de admissão de uma vaga de Programador Pleno Backend NodeJS.
O projeto em si é completo. FrontEnd e BackEnd.
Conta com um BFF(BackEnd For FrontEnd) da API GoRest, uma API falsa, com dados falsos para testes e demonstrações.
O objetivo é atender a todos os requisitos passados no teste:
 * Realizar um consumo completo de uma API REST utilizando a linguagem NodeJS
 * A execução deve ocorrer em ordem
 * Código bem estruturado
 * Leitura fácil
 * Testes automatizados
 * Infraestrutura Docker
 * Documentado
 * Ordem
   * Criar novo usuário
   * Listar todos os usuários da API
   * Encontrar usuário criado pelo ID
   * Criar novo post
   * Criar novo comentário no post criado
   * Criar novo comentário no primeiro post da lista pública
   * Apagar comentário do post na lista pública
   * Disponibilizar tudo em um repositório Git

## Tecnologias usadas
Neste projeto foram usadas diversas tecnologias.
As principais são
* NodeJS 16.14.0
* Docker 20.10.7
* Docker-compose 1.27.4
* Yarn 1.22.18
* Jest 27.5.1
* Typescript 4.6.3
* NextJS 12.1.2
* Express 4.17.3
* React 17.0.2

## Como instalar?
Primeiramente é necessário ter instalado o Docker e o Docker-compose na versão mais recente disponível para sua máquina.
Há instruções de como instalar em seu sistema operacional em [docker.com/get-docker](https://www.docker.com/get-docker).

É recomendável a instalação do Yarn e do NodeJS para desenvolvimento. Porém se deseja apenas testar, estas instalações são desnecessárias.
* [Instalação Yarn](https://yarnpkg.com/getting-started/install)
* [Download NodeJS](https://nodejs.org/pt-br/download/)

## Variáveis de ambiente
Há algumas variáveis de ambiente no projeto necessárias para o mesmo executar.
Elas podem ser definidas criando um arquivo `.env`.

Os arquivos `.env` tem sua expecificação de ambiente ao inserir um ponto e o nome do ambiente em seguida.

Exemplo: `.env.production`

Segue a relação dos ambientes e arquivos `.env`
* Produção: `.env.production`
* Desenvolvimento `.env`

É preciso fazer o login e criar um novo token no serviço da GoRest.
Uma Fake API para demonstração em testes como esse.

Após feito o login e gerado o token, defina-o nas variáveis de ambiente do ambiente que deseja utilizar da seguinte forma:

```
GO_REST_AUHORIZATION_TOKEN=<seu token>
```

Substitua "\<seu token\>" pelo seu token da GoRest.

Esta é a única variável explicitamente necessária para o funcionamento do sistema.
Além dela há algumas outras já preenchidas pelos containers Docker.

Segue a lista:

```
PORT=<porta do serviço>
HOSTNAME=<nome da máquina>
```

Utilize essas variáveis caso queira executar o teste sem a estrutura Docker.

Há ainda uma terceira variável de ambiente definida exclusivamente pelo sistema.

Ela se chama `script` e define em que script o projeto está rodando para definir se ele está em ambiente de desenvolvimento ou produção.

Todas as variáveis de ambiente são centralizadas no arquivo `src/config/envNames.ts`.
