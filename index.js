const express = require('express')
const helmet = require('helmet')

require('./libs/config')
const log = require('./libs/logger')

const { parseBody } = require('./middlewares/form')

const checkRoute = require('./routes/check')

const app = express()

app.use(helmet())
app.use(parseBody)

app.use('/check', checkRoute)

app.use('/', (req, res) => {
  res.send({
    error: 'invalid_path',
    error_description: 'You shall not pass',
  })
})

app.listen(process.env.PORT || 3001, '0.0.0.0', () => log.info(`Listening at port ${process.env.PORT || 3001}`))
