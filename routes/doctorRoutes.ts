import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { addDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor } from "../controllers/doctorController";

const router = express.Router();

router.post("/", authenticate, addDoctor);
router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.put("/:id", authenticate, updateDoctor);
router.delete("/:id", authenticate, deleteDoctor);

export default router;
