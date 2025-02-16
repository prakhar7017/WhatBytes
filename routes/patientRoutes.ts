import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { addPatient, getPatients, getPatientById, updatePatient, deletePatient } from "../controllers/patientController";

const router = express.Router();

router.post("/", authenticate, addPatient);
router.get("/", authenticate, getPatients);
router.get("/:id", authenticate, getPatientById);
router.put("/:id", authenticate, updatePatient);
router.delete("/:id", authenticate, deletePatient);

export default router;
