import Doctor from './doctorModel';
import Patient from './patientModel';
import PatientDoctorMapping from './patientDoctorMapping';

Doctor.hasMany(PatientDoctorMapping, { foreignKey: 'doctorId' });
Patient.hasMany(PatientDoctorMapping, { foreignKey: 'patientId' });
