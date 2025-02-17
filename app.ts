import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db";
import authRoutes from "./routes/authRoutes";
import patientRoutes from "./routes/patientRoutes";
import doctorRoutes from "./routes/doctorRoutes";
import mappingRoutes from "./routes/patientDoctorMapping";
import bodyParser from "body-parser";
const generateSwaggerDocs = require('./swagger');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/mappings", mappingRoutes);

sequelize
.sync()
  .then(() => console.log("Database connected"))
  .catch((error:any) => console.error("Database connection failed:", error));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    generateSwaggerDocs(app);
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api/docs`);
});
