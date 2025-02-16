import { Request, Response } from "express";
import Doctor from "../models/doctorModel";
import { AuthRequest } from "../middleware/authMiddleware";

export const addDoctor = async (req: AuthRequest, res: Response):Promise<any> => {
  try {
    const { name, specialization, contactNumber } = req.body;

    const newDoctor = await Doctor.create({ name, specialization, contactNumber });

    return res.status(201).json(newDoctor);
  } catch (error) {
    return res.status(500).json({ message: "Error adding doctor", error });
  }
};

export const getDoctors = async (req: Request, res: Response):Promise<any> => {
  try {
    const doctors = await Doctor.findAll();
    return res.json(doctors);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving doctors", error });
  }
};


export const getDoctorById = async (req: Request, res: Response):Promise<any> => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id);

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    return res.json(doctor);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving doctor", error });
  }
};


export const updateDoctor = async (req: AuthRequest, res: Response):Promise<any> => {
  try {
    const { id } = req.params;
    const { name, specialization, contactNumber } = req.body;

    const doctor = await Doctor.findByPk(id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    await doctor.update({ name, specialization, contactNumber });

    return res.json(doctor);
  } catch (error) {
    return res.status(500).json({ message: "Error updating doctor", error });
  }
};


export const deleteDoctor = async (req: AuthRequest, res: Response):Promise<any> => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id);
    
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    await doctor.destroy();

    return res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting doctor", error });
  }
};
