# API de Locação de Imóveis

Esta é uma API para gerenciar locações de imóveis, construída com Node.js, Express e Prisma.

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando a Aplicação](#executando-a-aplicação)
- [Endpoints](#endpoints)
- [Documentação Swagger](#documentação-swagger)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Pré-requisitos

- Node.js  v18.19.0
- npm (Node Package Manager)
- Prisma CLI
- Docker (for running Prisma with Docker)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/imobiliaria-api.git

2. Navigate to the project directory:

```bash
cd imobiliaria-api
```

3. Install dependencies:

```bash
npm install
```
4.Para rodar os containers em segundo plano (modo "detached")
docker compose up -d

5. Rodar migrate do prisma pra sincronizar a base
npx prisma migrate dev

6. Start the server:
```bash
npm run dev 
```
## Endpoints
## Imóveis

    GET /api/imoveis: Listar todos os imóveis - 02
    POST /api/imoveis: Cria um novo imóvel- 01
    GET /api/imoveis/{id}: Busca um imóvel pelo ID - 03
    PUT /api/imoveis/{id}: Atualiza um imóvel pelo ID - 04
    DELETE /api/imoveis/{id}: Deleta um imóvel pelo ID - 05

## Locações

    GET /api/locacoes: Listar todas as locações - 07 
    POST /api/locacoes: Cria uma nova locação - 06
    GET /api/locacoes/{id}: Busca uma locação pelo ID - 08
    PUT /api/locacoes/{id}: Atualiza uma locação pelo ID - 09
    DELETE /api/locacoes/{id}: Deleta uma locação pelo ID - 10


7. Rodar o primeiro serviço para Criar um novo imóvel

POST  http://localhost:3000/api/imoveis
'{
  "endereco": "Rua Teste, 124",
  "cep": "12345-679",
  "valor": 150740,
  "disponibilidade": true
}
'

8. Listar todos os imóveis. 
GER http://localhost:3000/api/imoveis

'{
    "message": "Lista de imóveis recuperada com sucesso",
    "data": [
        {
            "id": "043f726d-d32d-406e-b3e9-92982dca9bb0",
            "endereco": "Rua Exemplo, 127",
            "cep": "12345-6757",
            "valor": 500040,
            "disponibilidade": true,
            "alugado": false
        },
        {
            "id": "2d7af96f-5590-4ce5-84a3-978f4bd9fa05",
            "endereco": "Rua Exemplo, 127",
            "cep": "12345-6757",
            "valor": 500040,
            "disponibilidade": true,
            "alugado": false
        },
        {
            "id": "1db19d8a-f5bd-407a-95bc-b983feeecef6",
            "endereco": "Rua Teste, 123",
            "cep": "12345-678",
            "valor": 150000,
            "disponibilidade": true,
            "alugado": false
        },
        {
            "id": "b1914b12-7054-4547-9cbf-4638a3b966dc",
            "endereco": "Rua Exemplo, 127",
            "cep": "12345-6757",
            "valor": 500040,
            "disponibilidade": true,
            "alugado": false
        },
        {
            "id": "84bd6d8f-0dad-4ceb-b947-d6e5bb70700f",
            "endereco": "Rua Exemplo, 127",
            "cep": "12345-6757",
            "valor": 500040,
            "disponibilidade": true,
            "alugado": false
        },
        {
            "id": "2222adc0-d484-4f8a-b313-7a601657f196",
            "endereco": "Rua Exemplo, 128",
            "cep": "12345-6758",
            "valor": 500040,
            "disponibilidade": true,
            "alugado": false
        },
        {
            "id": "4ea135b8-2e6a-4b41-adc6-f1066ba1e2ba",
            "endereco": "Rua Exemplo, 128",
            "cep": "12345-6758",
            "valor": 500040,
            "disponibilidade": true,
            "alugado": false
        },
        {
            "id": "895725d9-e34b-4cd6-ac8b-fd0babba9c70",
            "endereco": "Rua Exemplo, 128",
            "cep": "12345-6758",
            "valor": 500040,
            "disponibilidade": true,
            "alugado": false
        },
        {
            "id": "ab8837dd-346b-4046-b7fa-83856df9d997",
            "endereco": "Rua Exemplo, 128",
            "cep": "12345-6758",
            "valor": 500040,
            "disponibilidade": true,
            "alugado": false
        },
        {
            "id": "a919d0d3-2277-4887-a20a-806949de54e1",
            "endereco": "Rua Teste, 123",
            "cep": "12345-678",
            "valor": 150000,
            "disponibilidade": true,
            "alugado": false
        },
        {
            "id": "e3c5f2bb-1cf9-4087-94c3-90dfa6821179",
            "endereco": "Rua Teste, 124",
            "cep": "12345-679",
            "valor": 150740,
            "disponibilidade": true,
            "alugado": false
        }
    ]
}'

9. Busca um imóvel pelo ID
GET http://localhost:3000/api/imoveis/1db19d8a-f5bd-407a-95bc-b983feeecef6

'{
    "message": "Imóvel com ID 1db19d8a-f5bd-407a-95bc-b983feeecef6 recuperado com sucesso",
    "data": {
        "id": "1db19d8a-f5bd-407a-95bc-b983feeecef6",
        "endereco": "Rua Teste, 123",
        "cep": "12345-678",
        "valor": 150000,
        "disponibilidade": true,
        "alugado": false
    }
}'

10. Atualizar um imóvel pelo ID

PUT 'http://localhost:3000/api/imoveis/24245384-78b3-4d24-9d80-a83b7b627f28'

'{
    "endereco": "Novo endereço",
    "cep": "Novo CEP",
    "valor": 1500.00,
    "disponibilidade": true
}
'
11, Deletar um imóvel pelo ID

DELETE 'http://localhost:3000/api/imoveis/24245384-78b3-4d24-9d80-a83b7b627f28'


Locações

12. Criar uma nova locação

POST http://localhost:3000/api/locacoes

'{
  "imovelId": "2d7af96f-5590-4ce5-84a3-978f4bd9fa05",
  "dataInicio": "2024-06-01",
  "dataFim": "2024-09-30"
}
'

'{
    "id": "46596986-0175-4048-ab75-5ef8ff78c39b",
    "imovelId": "2d7af96f-5590-4ce5-84a3-978f4bd9fa05",
    "dataInicio": "2024-06-01T00:00:00.000Z",
    "dataFim": "2024-09-30T00:00:00.000Z"
}'

13. Listar todos os imóveis

GET http://localhost:3000/api/locacoes

'[
    {
        "id": "b1fd11b9-6f60-48bc-aa44-f7d867fd275c",
        "imovelId": "1db19d8a-f5bd-407a-95bc-b983feeecef6",
        "dataInicio": "2024-06-01T00:00:00.000Z",
        "dataFim": "2024-06-30T00:00:00.000Z"
    },
    {
        "id": "46596986-0175-4048-ab75-5ef8ff78c39b",
        "imovelId": "2d7af96f-5590-4ce5-84a3-978f4bd9fa05",
        "dataInicio": "2024-06-01T00:00:00.000Z",
        "dataFim": "2024-09-30T00:00:00.000Z"
    }
]'

14. Busca um imóvel pelo ID

GET  http://localhost:3000/api/locacoes/b1fd11b9-6f60-48bc-aa44-f7d867fd275c

'{
    "id": "b1fd11b9-6f60-48bc-aa44-f7d867fd275c",
    "imovelId": "1db19d8a-f5bd-407a-95bc-b983feeecef6",
    "dataInicio": "2024-06-01T00:00:00.000Z",
    "dataFim": "2024-06-30T00:00:00.000Z"
}'

15.Atualizar uma locação pelo ID

PUT http://localhost:3000/api/locacoes/aba25d30-b877-48d5-9eaa-c996053ef9cb

'{
  "dataInicio": "2024-06-01",
  "dataFim": "2024-10-30"
}'

'{
    "id": "aba25d30-b877-48d5-9eaa-c996053ef9cb",
    "imovelId": "2d7af96f-5590-4ce5-84a3-978f4bd9fa05",
    "dataInicio": "2024-06-01T00:00:00.000Z",
    "dataFim": "2024-10-30T00:00:00.000Z"
}'

16.Deletar um imóvel pelo ID

DELETE http://localhost:3000/api/locacoes/aba25d30-b877-48d5-9eaa-c996053ef9cb




Documentação Swagger

A documentação completa da API está disponível através do Swagger UI.

Inicie a aplicação.
Abra o navegador e acesse http://localhost:3000/api-docs.