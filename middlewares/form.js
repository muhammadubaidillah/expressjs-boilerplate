const formidable = require('formidable')
const logger = require('../libs/logger')

function parseBody(req, res, next) {
  if (req.method === 'POST' && req.headers['content-type'] === 'text/plain' && req.path === '/callback/winpay') {
    next()
    return
  }

  const form = formidable({ multiples: true })

  form.parse(req, (err, fields, files) => {
    if (err) {
      logger.error(err)

      res.send({
        error: 'unknown_error',
        error_description: `Terjadi kesalahan saat memproses data`,
      })
    } else {
      req.body = fields
      req.files = files
      next()
    }
  })
}

module.exports = {
  parseBody,
}
