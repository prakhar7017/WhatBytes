import { Request, Response } from "express";
import PatientDoctorMapping from "../models/patientDoctorMapping";
import Patient from "../models/patientModel";
import Doctor from "../models/doctorModel";
import { AuthRequest } from "../middleware/authMiddleware";


export const assignDoctorToPatient = async (req: AuthRequest, res: Response):Promise<any> => {
  try {
    const { patientId, doctorId } = req.body;

    
    const existingMapping = await PatientDoctorMapping.findOne({ where: { patientId, doctorId } });
    if (existingMapping) return res.status(400).json({ message: "Doctor is already assigned to the patient." });

    const newMapping = await PatientDoctorMapping.create({ patientId, doctorId });

    return res.status(201).json(newMapping);
  } catch (error) {
    return res.status(500).json({ message: "Error assigning doctor to patient", error });
  }
};

export const getAllMappings = async (req: Request, res: Response):Promise<any> => {
  try {
    const mappings = await PatientDoctorMapping.findAll({ include: [Patient, Doctor] });
    return res.json(mappings);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving mappings", error });
  }
};


export const getDoctorsByPatientId = async (req: Request, res: Response):Promise<any> => {
  try {
    const { patientId } = req.params;

    const mappings = await PatientDoctorMapping.findAll({
      where: { patientId },
      include: [Doctor],
    });

    if (!mappings.length) return res.status(404).json({ message: "No doctors found for this patient." });

    return res.json(mappings);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving doctors for patient", error });
  }
};

export const removeDoctorFromPatient = async (req: Request, res: Response):Promise<any> => {
  try {
    const { id } = req.params;

    const mapping = await PatientDoctorMapping.findByPk(id);
    if (!mapping) return res.status(404).json({ message: "Mapping not found" });

    await mapping.destroy();

    return res.json({ message: "Doctor removed from patient successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error removing doctor from patient", error });
  }
};
