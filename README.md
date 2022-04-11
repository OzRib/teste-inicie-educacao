# teste-inicie-educacao
Teste de admissão para a empresa Inicie Educação

## Sumário
* [Do que se trata?](#do-que-se-trata)
* [Tecnologias usadas](#tecnologias-usadas)
* [Direto ao teste :hamburger:](#direto-ao-teste-hamburger)
* [Variáveis de ambiente](#variáveis-de-ambiente)
* [Scripts automatizados](#scripts-automatizados)

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

## Direto ao teste :hamburger:
Para ver o projeto em ação de maneira rápida siga estes passos:
#### Baixe o repositório do projeto na sua máquina
```
git clone https://github.com/OzRib/teste-inicie-educacao.git
```
#### Configure as variáveis de abiente
Clique [aqui](#variáveis-de-ambiente) para ver como definir as variáveis de ambiente.

#### Instale o Docker
[docker.com/get-docker](https://www.docker.com/get-docker)

#### Entre na pasta do projeto e execute o script de production(Sistemas Linux)
```
bin/production
```
Obs: Para máquinas com um sistema operacional não baseado em Linux, rode o comando `docker-compose up`

#### Abra seu navegador no endereço `http://localhost`

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

## Scripts automatizados
Eu elaborei scripts para facilitar o uso e desenvolvimento da estrutura do projeto.
Estes scripts são acessíveis na pasta `bin`.
Trata-se de um conjunto de shell scripts.
Foram desenvolvidos para uso em Linux.
Portanto não garanto que os mesmos rodem em outros kernels como o Windows-NT ou kernels BSD(FreeBSD e MacOS).

Porém não são muito complexos.
Fique à vontade para testá-los como achar melhor.
O objetivo é simplesmente simplificar a execução do projeto nos ambientes certos.

### Como executar um script?
Simples, vá na pasta raíz do projeto e execute o seguinte comando para executar um script:
```
bin/<script>
```
Substituindo "\<script\>" pelo nome do script desejado.

### Lista de scripts
Há no total 3 scripts na pasta `bin`:
* `dev`
* `production`
* `test`

Os scripts `dev` e `production` servem para executar a aplicação em si. Enquanto o script `test` apenas para executar um ambiente de testes.
Este último é totalmente substituível pela execução do comando `yarn test`, portanto até desnecessário.

#### `bin/dev`
Este script executa o projeto no modo de desenvolvimento, com o NextJS usando hot reload e o nodemon reiniciando a aplicação ao modificar um arquivo com uma das extensões monitoradas.
Altamente recomendado para o desenvolvimento pois o mesmo conta com tecnologias de hot reload e reinicialização da aplicação.
Ele não é recomendado se você quer uma experiência mais performática visto que o mesmo não carrega os módulos da maneira mais eficiente.
Isso se deve a ele sempre levar em consideração a possibilidade de uma nova modificação a qualquer momento.

#### `bin/production`
Este script executa o projeto no modo de produção, sem hot reload de páginas e sem reinicialização do nodemon(na verdade sem usar o nodemon em si).
Altamente recomendado para uma experiência mais performática.
Todos os módulos aqui são carregados pensando na maior performance possível.
Há cache de arquivos e toda uma estrutura pensada para obter o máximo de desempenho aqui.
Não recomendado para o desenvolvimento pois a cada alteração feita no código é preciso manualmente reinicializar o servidor e retranspilar todos os módulos o que gasta muito tempo.

#### `bin/test`
Este script simplesmente executa a switch de testes do projeto, rodando todos os testes unitários desenvolvidos.
