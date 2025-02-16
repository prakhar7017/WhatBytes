import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./userModel";

class Patient extends Model {
  public id!: number;
  public name!: string;
  public age!: number;
  public gender!: string;
  public medicalHistory?: string;
  public userId!: number;
}

Patient.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    gender: { type: DataTypes.ENUM("Male", "Female", "Other"), allowNull: false },
    medicalHistory: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Patient",
    tableName: "patients",
  }
);

Patient.belongsTo(User, { foreignKey: "userId" });

export default Patient;
