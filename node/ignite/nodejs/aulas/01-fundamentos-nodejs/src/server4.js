import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from '../route/routes.js'

// UUID => Unique Universal ID

// Usando o Postman para enviar requisição
// https://cloudy-crater-299185.postman.co/workspace/Limup~637aed2c-6982-47e6-837a-e4fdf3427139/folder/3378870-0c52921d-6050-4baa-8337-3a3ec9e717bf



const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route =>{
        return route.method == method && route.path.test(url)
    })

    console.log(route)

    if(route){
        const routeParams = url.match(route.path)
        console.log(routeParams)

        req.params = { ...routeParams.groups }
        return route.handler(req, res)
    }

    // return res.writeHead(404).end('Not Found')
    return res.writeHead(404).end()

    // Command to test in terminal
    // http GET localhost:3333/users
    // http POST localhost:3333/users
})

server.listen(3333)