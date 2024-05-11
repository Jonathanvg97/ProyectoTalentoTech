import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Proyecto Talento Tech",
      version: "1.0.0",
    },
    // components: {
    //   securitySchemes: {
    //     bearerAuth: {
    //       type: "http",
    //       scheme: "bearer",
    //       bearerFormat: "JWT",
    //     },
    //   },
    // },
  },
  apis: [`${path.join(__dirname, "./router/*")}`],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
