import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Proyecto Talento Tech",
      version: "1.0.0",
    },
  },
  apis: ['${path.join(__dirname, "./routes/*")}'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
