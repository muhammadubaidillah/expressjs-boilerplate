const Joy = require('joi')

function doValidate(req, res, next, config, object) {
  const schema = Joy.object(config)

  let validationObject
  if (typeof object === 'object') {
    validationObject = object
  } else {
    validationObject = req.method === 'POST' ? req.body : req.query
  }

  if (req.files) {
    validationObject.fileraw = req.files.fileraw
  }

  const { error } = schema.validate(validationObject, {
    allowUnknown: true,
  })
  if (error) {
    const {
      details: [{ message }],
    } = error

    return res.send({
      error: 'invalid_param',
      error_description: message.includes('/^(0|[+]?62)8[1-9][0-9]{7,}$/') ? 'Format nomor hp tidak valid' : message,
    })
  }

  return next()
}

function validateCoordinate(req, res, next) {
  doValidate(req, res, next, {
    latitude: Joy.number().required(),
    longitude: Joy.number().required(),
  })
}

module.exports = {
  validateCoordinate,
}
