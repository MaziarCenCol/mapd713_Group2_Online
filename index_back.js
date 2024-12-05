import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import route from "./routes/patientRoutes.js";
import swaggerUi from "swagger-ui-express";  // Import swagger-ui-express
import swaggerJsdoc from "swagger-jsdoc";  
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Patient API",
      version: "1.0.0",
      description: "API documentation for managing patients",
    },
    servers: [
      {
        //url: "http://localhost:5000",  // local server URL
        url: "https://mapd713nodeapi-bxfhe4hxbzfdewbz.canadacentral-01.azurewebsites.net/",  // Azure url
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    apis: ["./routes/*.js", "./controller/*.js"], // Files containing annotations
  };
  
  const swaggerSpec = swaggerJsdoc(options);
  
// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const PORT = process.env.PORT || 8000;
const mongourl = process.env.MONGO_URL;
mongoose.connect(mongourl).then(()=>{
    console.log("Connection success");
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error)=>console.log(error));
app.use("/api/patient",route);
app.get("/", (req, res) => {
  res.send("MAPD713 Project Server is running on Azure ...");
});

