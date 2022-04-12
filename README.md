# teste-inicie-educacao
Teste de admissão para a empresa Inicie Educação

## Sumário
* [Do que se trata?](#do-que-se-trata)
* [Tecnologias usadas](#tecnologias-usadas)
* [Direto ao teste :hamburger:](#direto-ao-teste-hamburger)
* [Variáveis de ambiente](#variáveis-de-ambiente)
* [Scripts automatizados](#scripts-automatizados)
* [Estrutura do projeto](#estrutura-do-projeto)
* [Rotas](#rotas)

## Do que se trata?
Um projeto feito para um teste de admissão de uma vaga de Programador Pleno Backend NodeJS.
O projeto em si é completo. FrontEnd e BackEnd.
Conta com um BFF(BackEnd For FrontEnd) da API [GoRest](https://gorest.co.in), uma API falsa, com dados falsos para testes e demonstrações.
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

É preciso fazer o login e criar um novo token no serviço da [GoRest](https://gorest.co.in).
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


## Estrutura do projeto
O projeto conta com uma estrutura arrojada. Frontend e backend.
Além disso, também contém padrões de projeto bem estruturados.
Foi baseado em controllers, com rotas separadas dentro da pasta do controller.
Há uma arquitetura de Docker baseada em ambientes e usa o conceito de um roteiro para desenvolver a lógica do teste.

### Docker
O projeto conta com 3 arquivos docker.
Cada um para um ambiente específico.

O arquivo `docker-compose.yml` é o principal arquivo docker.
Este contém toda a estrutura de produção, otimizada para o máximo de desempenho.

O arquivo `docker-compose.dev.yml` contém a versão do projeto para desenvolvimento.
Seu foco é facilitar a vida do desenvolvedor com tecnologias como hot reload e watch files.
Para recarregar a página ao atualizar o código e reiniciar o servidorem caso de alteração no backend, respectivamente.

O arquivo `docker-compose.test.yml` nada mais é do que o script de testes automatizado rodando no ambiente docker.
Foi feito para reaproveitar e usar o mesmo ambiente dos container docker para realizar os testes ao invés do computador do desenvolvedor especificamente.

### Build
O projeto foi feito inteiramente em Typescript.
Porém sabemos que o uso do mesmo em ambiente de produção pode ser desvantajoso vista a necessidade constante de checagem de tipos.
O Typescript foi feito para atuar ajudando o desenvolvedor a reduzir possíveis bugs de tipagem.
Porém em produção só tornaria o projeto mais pesado para o servidor.

Tendo em vista isso, fiz uma estrutura de build do projeto que transforma o código feito em uma versão mais leve e otimizada usando commonjs.

A pasta destino do build é justamente a pasta por nome `build`.
Adicionada no arquivo `.gitignore` para não ser lida pelo repositório Git.

Nela irão ficar os arquivos transpilados para o padrão EcmaScript 5.

### Pages
Como o teste é especificamente para uma vaga backend, tomei a liberdade de usar um framework do meu gosto pessoal para o frontend.
O framework NextJS.

Eu poderia ter utilizado somente ele para fazer o Frontend e o Backend.
Mas meu objetivo com este teste era demonstrar o máximo do meu conhecimento com o máximo de tecnologias possíveis.
Por isso utilizei o Express para o Backend.
Porém o Frontend é todo feito utilizando o NextJS.

O framework usa a pasta `pages` como padrão para usar como diretório raíz das páginas web.
A árvore de diretórios desta página já é a mesma árvore de diretórios refletida na aplicação.
Similar a como se trabalhava com PHP antigamente.

### EnvNames
O arquivo `src/config/envNames.ts` guarda todas as variáveis de ambiente do projeto.
Assim, seguindo os princípios de DRY(Don't Repeat Yourself) e Clean Code(Código Limpo), este arquivo centraliza todas as variáveis de ambiente em si, de uma maneira tão intuitiva que até dispensa o uso de um arquivo `.env.example`.

Assim, este arquivo serve tanto para facilitar o desenvolvimento como também como uma forma de documentação direta no código.

### App
Seguindo outro princípio, desta vez o da modularização de projetos, separei o arquivo inicial do servidor `src/index.ts` do arquivo que define configurações da aplicação, o `src/app.ts`.

Este arquivo usa o design pattern de factory para gerar uma aplicação Express junta ao NextJS para ser usada em um servidor da biblioteca nativa do NodeJS, a biblioteca `http`.

### Controllers
A aplicação segue o padrão de controllers.
Utilizando classes com atributos estáticos como controllers(Existem N maneiras de fazer isto. Esta é apenas uma delas), montei controllers para intermediar as requisições para a API [GoRest](https://gorest.co.in) e o frontend da aplicação.

Este conceito de Backend como intermediário entre um ou vários backends para um frontend é conhecido como BFF(Backend For Frontend).

Todos os controllers estão centralizados na pasta `src/controllers`.

### Routes
Para separar os controllers da lógica de rotas(Novamente, Don't Repeat Yourself), separei o controller em duas partes:
* Index
* Routes

As routes servem como usuários dos controllers para fornecer seus serviços através de rotas HTTP.
Todas as rotas usam Router's do Express para serem formadas, e são usadas pelo rootRouter para serem servidas como subrotas da rota principal `/api`.

### Roadmap
Indo para o fluxo de dados do Frontend agora, existe uma pasta que guarda o "roteiro" da aplicação.

A pasta `src/roadmap`

Fiz a aplicação inteira nesse formato de roteiro, como uma apresentação PowerPoint sequenciada.

Para isso pensei em utilizar uma estrutura de dados como uma fila.
Porém achei demasiado desnecessário e resolvi fazer neste formato que nomeei como Roadmap.

Talvez alguém já tenha dado outro nome para este formato, mas eu o chamo especificamente assim.

O arquivo index da página nada mais é do que uma factory para a roadmap.

Há uma subpasta chamada `actions`.

Ela conta com um arquivo index que organiza os "steps" e fornece toda uma estrutura para ser consumida em um provider chamado RoadmapProvider,
presente no arquivo `src/providers/roadmap.tsx`.

### Tests
O projeto conta com uma pasta exclusiva para testes unitários.
A pasta `src/__tests__/unit`.

Ela pasta guarda os arquivos de testes unitários do projeto na mesma estrutura de diretórios da aplicação.

Todos os testes são modularizados, utilzando mocks para simular a resposta de outros módulos ou serviços.

## Rotas
O projeto além de fazer todo o fluxo de dados requeridos no teste, oferece também uma API enquanto funciona!

### UserRoutes
Vamos para a primeira categoria de rotas.
As rotas de usuário ou UserRoutes.
Elas são responsáveis por gerenciar os usuários no projeto.
Todas as rotas descritas aqui são subrotas da rota `/api/users`.

#### `GET /`
Esta rota devolve todos os usuários da API em um um objeto JSON no formato de um array.

Exemplo:
```json
[
  {
    "id": 1,
    "name": "Chanakya Enbranthiri",
    "email": "embrantiry_chanakya@nitzche-leannon.com",
    "gender": "male",
    "status": "active"
  }
]
```

Há também alguns argumentos de URL opcionais.
Segue a lista:
Argumento | Valor | Exemplo | Função
-----|-----|-----|-----
email | E-mail | foo@bar.com | Filtrar os usuários pelo e-mail indicado nesse parâmetro.

#### `POST /`
Esta rota serve para enviar para a API da GoRest uma nova requisição para um novo usuário utilizando a nossa API como intermediária.

É necessário mandar um objeto JSON como `Content-Type`.

Portanto o Cabeçalho HTTP de uma requisição para esta rota ficaria parecido com isto:
```
POST http://localhost/api/users
Content-Type: application/json
```

O corpo da requisição deve ser um objeto JSON com os seguintes atributos:
Atributo | Valor | Tipo | Exemplo
-----|-----|-----|-----
name | Nome | String | Anurag Gupta
email | E-mail | email | gupta_anurag@treutel-khshlerin.ru
gender | Gênero | "male" ou "female" | male
status | Status | "active" ou "inactive" | active

Exemplo:
```
{
  "name": "Anurag Gupta",
  "email": "gupta_anurag@treutel-khshlerin.ru",
  "gender": "male",
  "status": "active"
}
```

#### `GET /:userId`
Esta rota é um pouco diferente.
Ela usa um parâmetro de URL.

Neste caso ela poderia ser acessada da seguinte forma:
`http://localhost/users/255`

Somente números podem ser passados nesse parâmetro de URL.
Caso um valor não numérico seja passado, ocorrerá um erro.

Ela retorna um usuário no formato JSON caso ache o usuário.

Exemplo:
```json
{
  "name": "Chatur Iyengar VM",
  "email": "chatur_vm_iyengar@douglas.io",
  "gender": "female",
  "status": "inactive"
}
```

#### `DELETE /:userId`
Esta rota deleta um usuário existente.
Basta indicar o id do usuário na URL.

### PostRoutes
As rotas de post, ou PostRoutes são responsáveis pela manipulação dos posts usados no projeto.
Todas as rotas aqui descritas são subrotas de `/api/posts`.

#### `GET /`
Esta rota retorna um objeto JSON no formato array com todos os post da API GoRest.

Exemplo:
```json
[
  {
    "id": 65535,
    "user_id": 32767,
    "title": "My first post",
    "body": "Be happy! The life is beautiful!"
  }
]
```

#### `POST /`
Esta rota cria um novo post com base em alguns dados fornecidos no corpo da requisição como um objeto JSON.

O cabeçalho da requisição é similar a este:
```
POST http://localhost/api/posts
Content-Type: application/json
```

O corpo da requisição deve ser um objeto JSON com os seguintes atributos:
Atributo | Valor | Tipo | Exemplo
-----|-----|-----
user_id | Id de usuário | Integer | 127
title | Título do post | String | Foo
body | Corpo do post | String | Bar

Exemplo:
```json
{
  "user_id": 127,
  "title": "Foo",
  "body": "Bar"
}
```

#### `GET /:postId`
Esta rota retorna um post já existente no formato JSON.

Exemplo:
```
{
  "id": 1409,
  "user_id": 2908,
  "title": "bsque et ut viduo vinco cur carmen quisquam tardus vomer",
  "body": "Non torqueo cunctatio. Vapulus dolores capto."
}
```

### CommentRoutes
As rotas de comentários são responsáveis pela manipulação dos comentários na aplicação.
Todas as rotas descritas a seguir são subrotas de `/api/comments`.

#### `GET /`
Esta rota retorna todos os comentários da API da GoRest no formato de um array em um objeto JSON.

Exemplo:
```json
[
  {
    "id":1397,
    "post_id":1410,
    "name":"Bhaaswar Joshi",
    "email":"bhaaswar_joshi@muller.com",
    "body":"Alias recusandae aut. Consequuntur vel eum. Cupiditate iusto et. Quae itaque reiciendis."
   }
]
```

Existem alguns parâmetros de URL opcionais nesta rota.
Segue a lista:
Parâmetro | Valor | exemplo | Função
-----|-----|-----|-----
postId | Id do post | 4095 | Filtrar comentários por post

#### `GET /:commentId`
Esta rota retorna um comentário em específico no formato JSON.

Exemplo:
```json
{
  "id":1396,
  "post_id":1410,
  "name":"Amb. Surya Mehra",
  "email":"surya_amb_mehra@wolff-bednar.net",
  "body":"Est ex est. Mollitia a voluptates."
 }
```

#### `POST /`
Essa rota cria um novo comentário com base nos dados forneciodos no corpo de uma requisição no formato JSON.

O cabeçalho da requisição é similar a este:
```
POST http://localhost/api/comments
Content-Type: application/json
```

O corpo da requisição deve ser um objeto JSON com os seguintes atributos:
Atributo | Valor | Tipo | Exemplo
-----|-----|-----
post_id | Id do post | Integer | 2047
name | Nome do usuário | String | Foo Bar
email | E-mail do usuário | String | foo@bar.com
body | Corpo do comentário | String | foo bar foo

Exemplo:
```json
{
  "post_id": 2047,
  "name": "Foo Bar",
  "email": "foo@bar.com",
  "body": "foo bar foo"
}
```

#### `DELETE /:userId`
Esta rota deleta um comentário existente.
Basta indicar o id do comentário na URL.
