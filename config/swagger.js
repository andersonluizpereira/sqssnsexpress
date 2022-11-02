require('dotenv').config()
module.exports = Object.freeze({
  definition: {
    openapi: '3.0.0',
    info: {
      description: 'POC SQSSNS management api',
      version: '1.0.0',
      title: 'POC SQSSNS - API',
      contact: {
       email: ''
     }
    },
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization'
      }
    },
    security: {
      Bearer: []
    },
    host: process.env.admissionToRabbitHost || 'localhost:5000',
    basePath: '/',
    schemes: ['http', 'https'] 
  }
})
