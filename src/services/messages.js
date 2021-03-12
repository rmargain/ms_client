import axios from "axios";

// Preparandonos para el futuro... podemos definir una url varieble en funcion al entorno donde se ejecuta nuestro proyecto
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://schoolmatch.herokuapp.com/api/message"
    : "http://localhost:3001/api/message";

const _axios = axios.create({
  baseURL,
  // Tenemos que enviar esta configuracion si el endpoint al que accedemos utiliza la sesion del server,  o sea si vamos a usar al req.user del backend.
  withCredentials: true,
});

export const createMessage = (message, applicationId) => _axios.post(`/create/${applicationId}`, message);
export const markAsRead = (messageId) => _axios.patch(`/read/${messageId}`);
export const deleteMessage = (messageId) => _axios.patch(`/delete/${messageId}`);
export const recoverMessage = (messageId) => _axios.patch(`/recover/${messageId}`);
export const getMessagesBySchool = (schoolId) => _axios.get(`/school/${schoolId}`);
export const getMessagesByUser = () => _axios.get('/applicant');
export const getMessagesBySchoolUser = () => _axios.get('/school-user');

