import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { assignDoctorToPatient, getAllMappings, getDoctorsByPatientId, removeDoctorFromPatient } from "../controllers/pateintDoctorMapping";

const router = express.Router();

router.post("/", authenticate, assignDoctorToPatient);
router.get("/", getAllMappings);
router.get("/:patientId", getDoctorsByPatientId);
router.delete("/:id", authenticate, removeDoctorFromPatient);

export default router;
