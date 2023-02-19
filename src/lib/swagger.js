const swaggerJsDocs = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Flipkart API Documentation",
      version: "1.0.0",
    },
  },
  apis: ["../routes/auth.js"],
};

const swaggerDocs = swaggerJsDocs(swaggerOptions);
console.log("working");
exports.swaggerDocs = swaggerDocs;
