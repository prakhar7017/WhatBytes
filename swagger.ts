const swaggerUi = require('swagger-ui-express');
const listEndpoints = require('express-list-endpoints');

const generateSwaggerDocs = (app: any) => {
  const endpoints = listEndpoints(app);

  const paths = endpoints.reduce((acc: any, endpoint: any) => {
    endpoint.methods.forEach((method: any) => {
      const path = endpoint.path;

      acc[path] = acc[path] || {};

      const parameters: any[] = [];

      
      const pathParamRegex = /:(\w+)/g;
      let match;
      while ((match = pathParamRegex.exec(path)) !== null) {
        parameters.push({
          name: match[1], 
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        });
      }

      if (method.toLowerCase() === 'get' && endpoint.query) {
        Object.keys(endpoint.query).forEach((key) => {
          parameters.push({
            name: key,
            in: 'query',
            schema: {
              type: 'string',
            },
          });
        });
      }

      
      let requestBody = null;
      if (method.toLowerCase() === 'post' || method.toLowerCase() === 'put') {
        requestBody = {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Success',
                  },
                },
              },
            },
          },
        };
      }

      
      const security = [{
        BearerAuth: [] 
      }];

      
      acc[path][method.toLowerCase()] = {
        description: `This endpoint handles ${method} requests for ${path}`,
        parameters, 
        requestBody, 
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Success',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad Request',
          },
          404: {
            description: 'Not Found',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
        security, 
      };
    });
    return acc;
  }, {});

  const swaggerSpec = {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'Automatically generated API documentation',
    },
    servers: [
      {
        url: 'http://localhost:5000', 
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', 
        },
      },
    },
    security: [
      {
        BearerAuth: [], 
      },
    ],
    paths,
  };


  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log('Swagger documentation available at http://localhost:5000/api/docs');
};

module.exports = generateSwaggerDocs;
