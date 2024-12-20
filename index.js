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
        url: "https://mapd713nodeapi-bxfhe4hxbzfdewbz.canadacentral-01.azurewebsites.net",  // Azure url
      },
    ],
  };
  
  app.use(cors({
    origin: ["https://mapd713nodeapi-bxfhe4hxbzfdewbz.canadacentral-01.azurewebsites.net"]
  }));
  
  const options = {
    swaggerDefinition,
    apis: ["./routes/*.js", "./controller/*.js"], // Files containing annotations
  };
  
  const swaggerSpec = swaggerJsdoc(options);
  
// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// .env and MongoDB
const PORT = process.env.PORT || 8000;
const mongourl = process.env.MONGO_URL;

mongoose
    .connect(mongourl)
    .then(() => {
        console.log("Connection success");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

app.use("/api/patient",route);

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MAPD713 Project</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
            }
            .container {
                text-align: center;
            }
            h1 {
                font-size: 24px;
                color: darkblue;
                margin-bottom: 50px;
            }
            .btn {
                font-size: 1.2em;
                padding: 10px 20px;
                background-color: #0078d4;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
                margin-top: 20px;
            }
            .btn:hover {
                background-color: #005fa3;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>MAPD713_Project Server Running on Azure ....</h1>
            <a href="https://mapd713nodeapi-bxfhe4hxbzfdewbz.canadacentral-01.azurewebsites.net/api-docs" class="btn" target="_blank">
                Test APIs on Swagger
            </a>
            <br/>
            <br/>
            <br/>
        </div>
    </body>
    </html>
  `);
});


