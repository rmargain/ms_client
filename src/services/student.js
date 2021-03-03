import axios from "axios";

// Preparandonos para el futuro... podemos definir una url varieble en funcion al entorno donde se ejecuta nuestro proyecto
const baseURL =
  process.env.NODE_ENV === "production"
    ? "algo" /* TODO: Cambiar por ruta en produccion */
    : "http://localhost:3001/student";

const _axios = axios.create({
  baseURL,
  // Tenemos que enviar esta configuracion si el endpoint al que accedemos utiliza la sesion del server,  o sea si vamos a usar al req.user del backend.
  withCredentials: true,
});

export const createStudent = (student) => _axios.post("/create", student);
export const updateStudent = (student) => _axios.patch(`${student._id}`, student)
export const studentProfile = (studentId) => _axios.get(`/${studentId}`);
export const studentsByUser = (_) => _axios.get(`/`);
export const deleteStudent = (studentId) => _axios.delete(`/${studentId}`)
// export const updateAvatar = (avatar) =>
//   _axios.post("/avatar/change", { avatar });
