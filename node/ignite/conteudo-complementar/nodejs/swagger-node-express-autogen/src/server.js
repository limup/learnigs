const express = require('express')
const swaggerUI = require('swagger-ui-express')

// const swaggerFile = require('../swagger.json')
const swaggerFile = require('../swagger-output.json')

const port = process.env.PORT || 3333
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

require('./routes')(app)

app.listen(port, () => console.log(`Running at http://localhost:${port}`))