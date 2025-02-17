import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Patient from './patientModel';
import Doctor from './doctorModel';

class PatientDoctorMapping extends Model {
  public id!: number;
  public patientId!: number;
  public doctorId!: number;
}

PatientDoctorMapping.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Patient, key: 'id' },
      onDelete: 'CASCADE',
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Doctor, key: 'id' },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'PatientDoctorMapping',
    tableName: 'patient_doctor_mappings',
  }
);

PatientDoctorMapping.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
PatientDoctorMapping.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

export default PatientDoctorMapping;
