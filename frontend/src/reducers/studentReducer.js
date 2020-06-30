import { CONSTANTS } from "../actions";
let listID = 4;
let cardID = 8;

// const initialState = [
//   {
//     title: "Active",
//     id: `list-active`,
//     students: [
//       {
//         "id": 2,
//         "firstname": "Barack",
//         "lastname": "Obama",
//         "studentid": 87654,
//         "phonenumber": 346899977655,
//         "status": "active"
//       },
//       {
//         "id": 5,
//         "firstname": "Barack5",
//         "lastname": "Obama",
//         "studentid": 87654,
//         "phonenumber": 346899977655,
//         "status": "active"
//       }
//     ]
//   },
//   {
//     title: "Delinquient",
//     id: `list-delinquient`,
//     students: [
//       {
//         "id": 3,
//         "firstname": "A3",
//         "lastname": "awesome",
//         "studentid": 87654,
//         "phonenumber": 346899977655,
//         "status": "delinquent"
//       },
//       {
//         "id": 6,
//         "firstname": "A6",
//         "lastname": "awesome",
//         "studentid": 87654,
//         "phonenumber": 346899977655,
//         "status": "delinquent"
//       }
//     ]
//   },
//   {
//     title: "Dropped",
//     id: `list-dropped`,
//     students: [
//       {
//         "id": 1,
//         "firstname": "idowu",
//         "lastname": "Bello",
//         "studentid": 22222,
//         "phonenumber": 83653553489893,
//         "status": "dropped"
//       },
//       {
//         "id": 4,
//         "firstname": "idowu4",
//         "lastname": "Bello",
//         "studentid": 22222,
//         "phonenumber": 83653553489893,
//         "status": "dropped"
//       }
//     ]
//   }
// ]

const studentReducer = (state = [], action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newLists = {
        title: action.payload,
        students: [],
        id: `list-${listID}`,
      };
      listID += 1;
      return [...state, newLists];

    case CONSTANTS.ADD_STUDENT: {
      const newStudent = {
        // ...action.payload.studentDetails,
        text: action.payload.text,
        id: `card-${cardID}`,
      };
      cardID += 1;

      console.log("action received", action);

      const newState = state.map((list) => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            students: [...list.students, newStudent],
          };
        } else {
          return list;
        }
      });

      return newState;
    }

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
      } = action.payload;
      const newState = [...state];

      //In the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list) => droppableIdStart === list.id);
        const student = list.students.splice(droppableIndexStart, 1);
        list.students.splice(droppableIndexEnd, 0, ...student);
      }

      //drop into other list
      if (droppableIdStart !== droppableIdEnd) {
        console.log(`${droppableIdStart} ${droppableIdEnd}`);

        //Find the list where drag happenned
        const listStart = state.find((list) => droppableIdStart === list.id);

        //pull out the card from this list
        let card = listStart.students.splice(droppableIndexStart, 1);
        let studentNewStatus;
        if (droppableIdEnd.toLowerCase().indexOf("dropped") > -1) {
          studentNewStatus = "dropped";
        }

        if (droppableIdEnd.toLowerCase().indexOf("delinquent") > -1) {
          studentNewStatus = "delinquent";
        }

        if (droppableIdEnd.toLowerCase().indexOf("active") > -1) {
          studentNewStatus = "active";
        }

        if (card instanceof Array && card.length > 0) {
          card[0]["status"] = studentNewStatus;
        }

        //Find the list where the drag ended
        const listEnd = state.find((list) => droppableIdEnd === list.id);

        //Put the card into new list
        listEnd.students.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;

    case CONSTANTS.GET_STUDENT_RECORDS:
      // return { ...state, studentRecords: groupFn(action.payload) };
      return [...groupFn(action.payload)];
    default:
      return state;
  }
};

export default studentReducer;

function groupFn(list) {
  let returnArr = [];
  let activeStudents = [];
  let delinquentStudents = [];
  let droppedStudents = [];

  list.forEach((student) => {
    if (student.status === "active") {
      returnArr = activeStudents.push(student);
    }
    // console.log(returnArr);

    if (student.status === "delinquent") {
      returnArr = delinquentStudents.push(student);
    }
    if (student.status === "dropped") {
      returnArr = droppedStudents.push(student);
    }
  });
  returnArr = [
    {
      title: "Active",
      id: `list-active`,
      students: activeStudents,
    },
    {
      title: "Delinquent",
      id: `list-delinquent`,
      students: delinquentStudents,
    },
    {
      title: "Dropped",
      id: `list-dropped`,
      students: droppedStudents,
    },
  ];

  return returnArr;
}
