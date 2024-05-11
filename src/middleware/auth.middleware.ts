const jwt = require("jsonwebtoken");

// Función para generar un token JWT
const generateJWT = (
  _id: string,
  email: string = "",
  role: string = "",
  expiresIn = "1h", // Duración predeterminada del token
  jwtSecret = process.env.JWT_SECRET
) => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id,
      email,
      role,
    };
    jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: expiresIn,
      },
      (error: string, token: string) => {
        if (error) {
          console.log(error);
          reject("No se puede generar el token");
        } else resolve(token);
      }
    );
  });
};

export default generateJWT;
