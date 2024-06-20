require("dotenv").config();

export const config: any = {
  desarrollo: {
    database: {
      connection: process.env.MONGODB_URI,
    },
    email: {
      port: process.env.PORT_EMAIL_DESARROLLO,
      host: process.env.HOST_EMAIL_DESARROLLO,
      email: process.env.USER_EMAIL_DESARROLLO,
      password: process.env.PASS_EMAIL_DESARROLLO,
      from: process.env.FROM_EMAIL_DESARROLLO,
    },
    frontendUrl: process.env.FRONTEND_URL_DESARROLLO,
    jwtSecret: process.env.JWTSECRET,
    jwtSecretPass: process.env.JWT_SECRET_PASS,
  },
  pruebas: {
    database: {
      connection: process.env.MONGODB_URI,
    },
    email: {
      port: process.env.PORT_EMAIL_PRUEBAS,
      host: process.env.HOST_EMAIL_PRUEBAS,
      email: process.env.USER_EMAIL_PRUEBAS,
      password: process.env.PASS_EMAIL_PRUEBAS,
      from: process.env.FROM_EMAIL_PRUEBAS,
    },
    jwtSecret: process.env.JWTSECRET,
    jwtSecretPass: process.env.JWT_SECRET_PASS,
  },

  //TODO Configurar cuando se realice el despliegue
  produccion: {
    database: {
      connection: process.env.DB_CONNECTION,
    },
    email: {
      host: process.env.HOST_EMAIL_PRODUCCION,
      port: process.env.PORT_EMAIL_PRODUCCION,
      user: process.env.USER_EMAIL_PRODUCCION,
      from: process.env.FROM_EMAIL_PRODUCCION,
      pass: process.env.PASS_EMAIL_PRODUCCION,
    },
    frontendUrl: process.env.FRONTEND_URL_PRODUCCION,
    jwtSecret: process.env.JWTSECRET,
    jwtSecretPass: process.env.JWT_SECRET_PASS,
  },
};
