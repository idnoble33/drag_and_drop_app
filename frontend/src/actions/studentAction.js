import { CONSTANTS } from "../actions";
import axios from "axios";

export const addStudent = (listID, text) => {
  return {
    type: CONSTANTS.ADD_STUDENT,
    payload: { text, listID },
  };
};
export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId
) => {
  return {
    type: CONSTANTS.DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
    },
  };
};
// export function getStudentRecords(){
//   const request = axios.get(`http://localhost:7000/registration/`)
//   .then(response => response.data)

//   .catch((error) => {
//     console.log(error);
//   });

//   return {
//     type: CONSTANTS.GET_STUDENT_RECORDS,
//     payload: request
//   }
// }

export async function getStudentRecords() {
  const request = await axios.get(`http://localhost:7000/registration/`);
  return request.data;
}
