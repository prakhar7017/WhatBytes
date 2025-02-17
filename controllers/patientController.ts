import { Request, Response } from "express";
import Patient from "../models/patientModel";
import { AuthRequest } from "../middleware/authMiddleware";

export const addPatient = async (req: AuthRequest, res: Response) : Promise<any>=> {
  try {
    const { name, age, gender, medicalHistory } = req.body;
    const userId = req.user?.id;

    const patient = await Patient.create({ name, age, gender, medicalHistory, userId });
    return res.status(201).json({ message: "Patient added successfully", patient });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getPatients = async (req: AuthRequest, res: Response):Promise<any> => {
  try {
    const userId = req.user?.id;
    const patients = await Patient.findAll({ where: { userId } });
    return res.json(patients);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getPatientById = async (req: AuthRequest, res: Response):Promise<any> => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    return res.json(patient);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updatePatient = async (req: AuthRequest, res: Response):Promise<any> => {
  try {
    const { name, age, gender, medicalHistory } = req.body;
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    await patient.update({ name, age, gender, medicalHistory });
    return res.json({ message: "Patient updated successfully", patient });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const deletePatient = async (req: AuthRequest, res: Response):Promise<any> => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    await patient.destroy();
    return res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
