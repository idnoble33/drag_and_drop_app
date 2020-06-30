import React, { Component } from "react";
import StudentStatus from "../status/studentStatus";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 100%;
  padding: 8px;
  margin-right: 8px;
`;
const pageNumCss = {
  border: "1px solid #17A288",
  color: "#17A288",
  textAlign: "center",
  fontWeight: "bold",
};

class StudentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registers: [],
      currentPage: 1,
      StudentsPerPage: 4,
    };
  }
  changePage = (event) => {
    this.setState({
      [event.target.name]: parseInt(event.target.value),
    });
  };

  firstPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1,
      });
    }
  };
  prevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };
  lastPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.props.students.length / this.state.StudentsPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(
          this.props.students.length / this.state.StudentsPerPage
        ),
      });
    }
  };
  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.props.students.length / this.state.StudentsPerPage)
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  render() {
    //console.log("hi student", this.props);
    const stuRec = this.props.students;

    const { currentPage, StudentsPerPage } = this.state;

    //console.log("stuRec", stuRec);
    const lastIndex = currentPage * StudentsPerPage;
    const firstIndex = lastIndex - StudentsPerPage;
    const currentStudents = stuRec.slice(firstIndex, lastIndex);
    const totalPages = stuRec.length / StudentsPerPage;
    //console.log("Studentlist props", this.props);

    

    return (
      <>
        <Droppable droppableId={String(this.props.listID)}>
          {(provided, snapshot) => (
            <div className="container">
              <ListContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
                style={{
                  ...provided.droppableProps.style,
                  boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
                  backgroundColor: snapshot.isDraggingOver ? "#3F51B5" : "none",
                }}
              >
          
                <h4>{this.props.title}</h4>
                <div className="table-responsive">
                <table
                  className="table table-striped table-dark container"
                  style={{ marginTop: "30px" }}
                >
                      <thead>
                            <tr
                              className="text-info"
                              style={{
                                float: "left",
                                // padding: "30px",
                                fontWeight: "500",
                              }}
                            >
                              
                                <th scope="col">Firstname</th>
                                <th scope="col">Lastname</th>
                                <th scope="col">Action</th>
                               
                            </tr>
                      </thead>
                </table>
                </div>
                {currentStudents.map((student, index) => (
                  <StudentStatus
                    index={index}
                    key={student._id}
                    stu={student}
                    text={`${student.firstname} 
            ${student.lastname}
             ${student.studentid}
             ${student.phonenumber}
             ${student.status}

             `}
                    id={student._id}
                  />
                ))}
                {provided.placeholder}
                <footer className="container">
                  <div style={{ float: "left" }}>
                    showing Page {currentPage} of {totalPages}
                  </div>
                  <div style={{ float: "right" }}>
                    <InputGroup size="sm">
                      <InputGroup.Prepend>
                        <Button
                          type="button"
                          variant="outline-info"
                          disabled={currentPage === 1 ? true : false}
                          onClick={this.firstPage}
                        >
                          <FontAwesomeIcon icon={faFastBackward} /> First
                        </Button>
                        <Button
                          type="button"
                          variant="outline-info"
                          disabled={currentPage === 1 ? true : false}
                          onClick={this.prevPage}
                        >
                          <FontAwesomeIcon icon={faStepBackward} /> Prev
                        </Button>
                      </InputGroup.Prepend>
                      <FormControl
                        style={pageNumCss}
                        className={"bg-dark"}
                        name="currentPage"
                        value={currentPage}
                        onChange={this.changePage}
                      />
                      <InputGroup.Append>
                        <Button
                          type="button"
                          variant="outline-info"
                          disabled={currentPage === totalPages ? true : false}
                          onClick={this.nextPage}
                        >
                          <FontAwesomeIcon icon={faStepForward} /> Next
                        </Button>
                        <Button
                          type="button"
                          variant="outline-info"
                          disabled={currentPage === totalPages ? true : false}
                          onClick={this.lastPage}
                        >
                          <FontAwesomeIcon icon={faFastForward} /> Last
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </div>
                </footer>
              </ListContainer>
            </div>
          )}
        </Droppable>
      </>
    );
  }
}

export default StudentList;
