require('dotenv').config();

const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const sequelize = require('./src/config/database.js');

const authRoute = require('./src/routes/authRoute.js');
const bookRoute = require('./src/routes/bookRoute.js');
const preferenciasRoute = require('./src/routes/preferenciasRoute.js');
const userRoute = require('./src/routes/userRoute.js');
const generoRoute = require('./src/routes/generoRoute.js');
const statusBook = require('./src/routes/statusBookRoute.js');
const typeTransaction = require('./src/routes/TypeTransactionRoute.js');
const imagemsRoute = require('./src/routes/imagensRoute.js');
const interessesRoute = require('./src/routes/InteressesRoute.js');
const chatRoutes = require('./src/routes/chatRoutes.js');

const defineAssociations = require('./src/models/associations.js');

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Littera API',
      version: '1.0.0',
      description: 'API for managing LitteraApi'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json({limit: '10mb'}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', authRoute, bookRoute, preferenciasRoute, userRoute, generoRoute, statusBook, typeTransaction, imagemsRoute, interessesRoute, chatRoutes);

defineAssociations();

const PORT = 3000;

async function startServer() {
  try {
    await sequelize.sync({ alter : true });
    console.log('Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();

