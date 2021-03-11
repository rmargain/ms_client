import axios from "axios";

// Preparandonos para el futuro... podemos definir una url varieble en funcion al entorno donde se ejecuta nuestro proyecto
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://schoolmatch.herokuapp.com/api/application"
    : "http://localhost:3001/api/application/";

const _axios = axios.create({
  baseURL,
  // Tenemos que enviar esta configuracion si el endpoint al que accedemos utiliza la sesion del server,  o sea si vamos a usar al req.user del backend.
  withCredentials: true,
});

export const createApplication = (schoolId, application) => _axios.post(`/${schoolId}`, application);
export const cancelApplication = (applicationId, message) =>
  _axios.patch(`/cancel/${applicationId}`, message);
export const approveApplication = (applicationId, body) =>
  _axios.patch(`/approve/${applicationId}`, body);
export const getApplicationsbySchool = (schoolId) => _axios.get(`/school/${schoolId}`);
export const getApplicationsbySchoolUser = () => _axios.get(`/`);
export const getApplicationById = (applicationId) => _axios.get(`/${applicationId}`);
export const getApplicationByUser = (userId) => _axios.get(`/user/${userId}`);


