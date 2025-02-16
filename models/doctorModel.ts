import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Doctor extends Model {
  public id!: number;
  public name!: string;
  public specialization!: string;
  public contactNumber!: string;
}

Doctor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Doctor",
    tableName: "doctors",
  }
);

export default Doctor;
