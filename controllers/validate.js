const express = require('express')
const validate = require('./validateJson')
const validateJson = validate.validateJson
const getData = validate.getData
const router = express.Router()

router.post('/validateJson', validateJson)
router.get('/validateJson', getData)

module.exports = router