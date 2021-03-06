import axios from "axios";

// Preparandonos para el futuro... podemos definir una url varieble en funcion al entorno donde se ejecuta nuestro proyecto
const baseURL =
  process.env.NODE_ENV === "production"
    ? "algo" /* TODO: Cambiar por ruta en produccion */
    : "http://localhost:3001/school";

const _axios = axios.create({
  baseURL,
  // Tenemos que enviar esta configuracion si el endpoint al que accedemos utiliza la sesion del server,  o sea si vamos a usar al req.user del backend.
  withCredentials: true,
});

export const createSchool = (schoolInfo) => _axios.post("/create", schoolInfo);
export const updateSchool = (schoolId, school) =>
  _axios.patch(`/update/${school._id}`, school);
export const getAllSchools = () => _axios.get(`/all`);
export const getSchoolsByUser = () => _axios.get(`/`);
export const getAllFilteredSchools = (_) => _axios.get(`/`);
export const getSchoolById = (schoolId) => _axios.get(`/${schoolId}`);
export const studentsbySchool = (schoolId) => _axios.get(`/${schoolId}`);
export const deleteSchool = (schoolId) => _axios.delete(`/${schoolId}`);
export const uploadImages = (image, schoolId) => _axios.post(`/upload/${schoolId}`, image);
