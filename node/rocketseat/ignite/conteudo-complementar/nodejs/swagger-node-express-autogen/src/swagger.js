const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Swagger node/express",
    description: "Documentação do node/express",
    version: "1.0.0"
  },
  host: "localhost:3333",
};

const outputFile = "swagger-output.json";
const routes = ["../src/routes.js"];

swaggerAutogen(outputFile, routes, doc);
