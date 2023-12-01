//Padrão de importação CommoJS - Não é mais utilizado desta forma
//Módulo interno
//const http = require('http')

// Exemplo de módulo terceiro
// import fastify from 'fastify'

import http from 'node:http'

// - Criar usuário
// - Listagem usuários
// - Edição de usuário
// - Remoção de usuário

// HTTP possui dois recursos importantes
    // - Método HTTP
    // - URL

// Métodoas: GET, POST, PUT, PATCH, DELETE
// GET     =>  Buscar uma recurso do back-end
// POST    =>  Criar uma recurso no back-end
// PUT     => Atualizar um recurso no back-end
// PATCH   => Atualizar uma informação específica de um recurso no back-end
// DELETE  => Deletar um recurso do back-end

// Em node existem dois tipos de conceitos de aplicação
// Stateful     armazena os dados em memória, localmente
// Stateless    armazena os dados em base (NoSQL, SQL, Text etc)

// JSON - JavaScript Object Notation é uma estrutura de dados para transição de dados entre back e front

// Cabeçalhos(Headers) (Requisição/resposta) => São metados

// HTTP Status Code (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
    // Informational responses (100 – 199)
    // Successful responses (200 – 299)
    // Redirection messages (300 – 399)
    // Client error responses (400 – 499)
    // Server error responses (500 – 599)

const users = []

const server = http.createServer((req, res) => {
    const { method, url } = req

    console.log(method, url)
    console.log(req.headers)

    if (method === 'GET' && url === '/users') {
        // Early return
        // return res.end('Listagem de usuários')
        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com'
        })

        // Early return
        // return res.end('Criação de usuários')

        return res.writeHead(201).end()
    }
    

    // return res.end('Hello world!')

    // return res.writeHead(404).end('Not Found')
    return res.writeHead(404).end()

    // Command to test in terminal
    // http GET localhost:3333/users
    // http POST localhost:3333/users
})

server.listen(3333)