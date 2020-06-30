import React, { Component } from "react";
import StudentList from "./StudentList";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { sort, getStudentRecords } from "../actions";
import styled from "styled-components";
import { CONSTANTS } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  margin-right: 8;
`;

class StudentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registers: [],
      currentPage: 1,
      StudentsPerPage: 10,
    };
  }

  // componentDidMount(){
  //   this.props.dispatch(getStudentRecords(this.props.students))
  // }
  async componentDidMount() {
    let studentData = await getStudentRecords();
    this.props.dispatch({
      type: CONSTANTS.GET_STUDENT_RECORDS,
      payload: studentData,
    });
  }

  onDragEnd = (result) => {
    //Reordering student registration logic
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
  };
  render() {
    let students = this.props.students;
    //console.log("student", students);

    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="container">
            <h4>
              <FontAwesomeIcon icon={faUsers} /> Students Records
            </h4>
            <tbody>
            {students.length === 0 ? (
                      <tr align="center">
                        <td colSpan="6"> No Student Available, Please run the server...</td>
                      </tr>
                    ) : (
            <ListContainer>
              {students && students instanceof Array
                ? students.map((student, index) => (
                    <StudentList
                      index={index}
                      listID={student.id}
                      key={student._id}
                      title={student.title}
                      students={student.students}
                    />
                  ))
                : null}
               
            </ListContainer>
             )}
             </tbody>
          </div>       
        </DragDropContext>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  students: state.students,
});

export default connect(mapStateToProps)(StudentTable);
