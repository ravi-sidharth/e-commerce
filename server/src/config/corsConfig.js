const cors = require("cors");

const corsConfig = () => {
  return cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.CLIENT_URL, 
        "http://localhost:5173", 
      ];

      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); 
      } else {
        callback(new Error("Not allowed by cors"));
      }
    },
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
    exposedHeaders: false,
    credentials: true, 
    preflightContinue: false,
    maxAge: 600, 
    optionsSuccessStatus: 204,
  });
};

module.exports = { corsConfig };