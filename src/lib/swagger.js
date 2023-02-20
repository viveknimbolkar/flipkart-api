const swaggerJsDocs = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Flipkart API Documentation",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDocs(swaggerOptions);
exports.swaggerDocs = swaggerDocs;
