const axios = require('axios');
const rax = require('retry-axios');
const qs = require('qs');

module.exports = {
  async getToken() {
    const data = qs.stringify({
      grant_type: process.env.grantType,
      client_id: process.env.clientId,
      client_secret: process.env.clientSecret,
    });

    const { urlToken } = process.env;

    try {
      const config = {
        method: 'post',
        url: urlToken,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data,
      };

      const client = axios.create({
        baseURL: urlToken,
        timeout: 12000,
      });

      client.defaults.raxConfig = {
        instance: client,
        retry: 3,
        noResponseRetries: 3,
        retryDelay: 3000,
      };

      rax.attach(client);

      return client(config)
        .then(response => response.data.access_token)
        .catch(errorToken => {
          console.log(
            `Erro ao buscar token Enviou :${data}, Url:${urlToken}, Retorno:${errorToken}`,
          );
        });
    } catch (error) {
      console.log(error);
    }
  },
};
