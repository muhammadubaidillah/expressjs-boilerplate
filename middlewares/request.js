const { v4: uuidv4 } = require('uuid')
const logger = require('../libs/logger')

async function recordHit(req, res, next) {
  const clientIp = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const mid = uuidv4()

  res.locals.mid = mid
  res.locals.clientIp = clientIp
  res.locals.response = { mid, ip: clientIp, time_request: Date.now() }

  logger.info(`[${mid}] IP ${clientIp} with authorization ${req.headers.authorization}`)
  logger.info(`[${mid}] ${req.method} ${req.originalUrl}`)

  next()
}

async function recordRequest(req, res, next) {
  const { mid } = res.locals

  if (req.method === 'GET') {
    logger.info(`[${mid}] REQ: ${JSON.stringify(req.query)}`)
  } else {
    const { pin } = req.body
    if (pin !== undefined) {
      logger.info(`[${mid}] REQ: ${JSON.stringify({ ...req.body, pin: '******', old_pin: '******' })}`)
    } else {
      logger.info(`[${mid}] REQ: ${JSON.stringify(req.body)}`)
    }
    if (req.files) {
      if (req.files.length > 1) {
        logger.info(`[${mid}] with ${req.files.length} files`)
      } else {
        const { fileraw } = req.files
        logger.info(`[${mid}] with file: ${JSON.stringify(fileraw)}`)
      }
    }
  }

  next()
}

async function recordResponse(req, res) {
  const { mid, response } = res.locals

  response.time_response = Date.now()

  logger.info(`[${mid}] RESP: ${JSON.stringify(response)}`)

  res.send(response)
}

module.exports = {
  recordHit,
  recordRequest,
  recordResponse,
}
