const glob = require('glob')
const swaggerDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const express = require('express')
const { swagger } = require('../config')
const router = express.Router()

module.exports = ({ modelsExpression, controllersExpression }) => {
  const swaggerConf = {
    ...swagger,
    apis: [
      ...glob.sync(modelsExpression),
       ...glob.sync(controllersExpression)
    ]
  }

  const options = {
    customSiteTitle: 'Vacina Admissão - Documentação'
  }

  router.use('/docs', swaggerUi.serve)
  router.get('/docs', swaggerUi.setup(swaggerDoc(swaggerConf), options))

  return router
}
