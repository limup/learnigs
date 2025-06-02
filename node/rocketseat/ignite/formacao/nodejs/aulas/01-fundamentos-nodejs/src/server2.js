import http from 'node:http'
import { json } from './middlewares/json.js'

// Usando o Postman para enviar requisição
// https://cloudy-crater-299185.postman.co/workspace/Limup~637aed2c-6982-47e6-837a-e4fdf3427139/folder/3378870-0c52921d-6050-4baa-8337-3a3ec9e717bf

const users = []

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    if (method === 'GET' && url === '/users') {
        // Early return
        // return res.end('Listagem de usuários')
        return res
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        //desestruturação
        const { name, email } = req.body

        users.push({
            id: 1,
            name: name,
            email: email
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