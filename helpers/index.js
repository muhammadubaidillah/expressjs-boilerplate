function isJsonString(str) {
  if (!str) {
    return false
  }

  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

function normalizePhone(phone) {
  let phoneNumber
  if (phone) {
    phoneNumber = phone.trim()
  } else {
    phoneNumber = ''
  }

  if (phoneNumber.startsWith('+62')) {
    phoneNumber = `${phoneNumber.substring(1)}`
  } else if (phoneNumber.startsWith('62')) {
    phoneNumber = `${phoneNumber}`
  } else if (phoneNumber.startsWith('0')) {
    phoneNumber = `62${phoneNumber.substring(1)}`
  } else {
    phoneNumber = `62${phoneNumber}`
  }

  return phoneNumber
}

function denormalizePhone(phone) {
  let phoneNumber
  if (phone) {
    phoneNumber = phone.trim()
  } else {
    phoneNumber = ''
  }

  if (phoneNumber.startsWith('+62')) {
    phoneNumber = `0${phoneNumber.substring(3)}`
  } else if (phoneNumber.startsWith('62')) {
    phoneNumber = `0${phoneNumber.substring(2)}`
  } else if (phoneNumber.startsWith('0')) {
    phoneNumber = `${phoneNumber}`
  } else {
    phoneNumber = `0${phoneNumber}`
  }

  return phoneNumber
}

function moneyFormat(amount) {
  const result = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    maximumSignificantDigits: Math.trunc(Math.abs(amount)).toFixed().length,
  }).format(amount)

  return result
}

function isImageFile(file) {
  if (!file) return false

  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  if (file.mimetype && allowedMimeTypes.includes(file.mimetype)) {
    return true
  }

  if (file.originalname) {
    const fileExtension = file.originalname.split('.').pop()
    if (allowedMimeTypes.includes(fileExtension)) {
      return true
    }
  }

  return false
}

function isVideoFile(file) {
  if (!file) return false

  const allowedMimeTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi']

  if (file.mimetype && allowedMimeTypes.includes(file.mimetype)) {
    return true
  }

  if (file.originalname) {
    const extension = file.originalname.split('.').pop().toLowerCase()
    if (allowedMimeTypes.includes(extension)) {
      return true
    }
  }

  return false
}

function jsonMinify(json) {
  try {
    return JSON.stringify(JSON.parse(json))
  } catch (error) {
    return false
  }
}

module.exports = {
  isJsonString,
  normalizePhone,
  denormalizePhone,
  moneyFormat,
  isImageFile,
  isVideoFile,
  jsonMinify,
}
