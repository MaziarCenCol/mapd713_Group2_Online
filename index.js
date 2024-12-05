import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
// import route from "./routes/patientRoutes.js";
// import swaggerUi from "swagger-ui-express";
// import swaggerJsdoc from "swagger-jsdoc";
// import cors from "cors";

const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// dotenv.config();

// Root route
app.get("/", (req, res) => {
    res.send("MAPD713 Project Server is running on Azure ...");
});

// Simplify for debugging
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
