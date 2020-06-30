import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import axios from "axios";

const CardContainer = styled.div`
  margin-bottom: 8px;
`;

const Student = (props) => <tr></tr>;

class StudentStatus extends Component {
  constructor(props) {
    super(props);

    this.deleteStudent = this.deleteStudent.bind(this);

    this.state = {
      registers: [],
      currentPage: 1,
      StudentsPerPage: 2,
      search: "",
    };
  }
  deleteStudent = (id) => {
    axios
      .delete(`http://localhost:7000/registration/${id}`)
      .then((res) => console.log(res.data));
    this.setState({
      registers: this.state.registers.filter((el) => el._id !== id),
    });
    window.location = "/";
  };

  studentList() {
    const studentReg = this.state.registers;
    return studentReg.map((currentstudent) => {
      return (
        <Student
          student={currentstudent}
          deleteStudent={this.deleteStudent}
          key={currentstudent._id}
        />
      );
    });
  }

  render() {
    return (
      <Draggable draggableId={String(this.props.id)} index={this.props.index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
              backgroundColor: snapshot.isDragging ? "#17a2b8" : "none",
            }}
          >
            <CardContainer>
              <Card>
                <CardContent>
                  <Typography gutterBottom component="span">
                    <div className="table-responsive">
                      <table
                        className="table table-striped table-dark container"
                        style={{ marginTop: "30px" }}
                      >
                        <thead>
                          <tr
                            className="container"
                            style={{
                              float: "left",
                              //padding: "30px",
                              fontWeight: "500",
                            }}
                          ></tr>
                        </thead>
                        <tbody>
                          <tr className="text-info">
                            <td scope="col">{this.props.stu.firstname}</td>
                            <td scope="col">{this.props.stu.lastname}</td>

                            <td scope="col">
                              <span
                                className="material-icons text-danger"
                                style={{ cursor: "pointer" }}
                              >
                                <Link
                                  to={{
                                    pathname: `/detail/${this.props.stu._id}`,
                                  }}
                                >
                                  details
                                </Link>
                              </span>
                            </td>
                            <td scope="col">
                              <span
                                className="material-icons text-danger"
                                style={{ cursor: "pointer" }}
                              >
                                <Link to={"/" + this.props.stu._id}>edit</Link>
                              </span>
                            </td>
                            <td scope="col">
                              <span
                                onClick={() => {
                                  this.deleteStudent(this.props.stu._id);
                                  console.log(this.props.stu._id);
                                }}
                                className="material-icons text-danger"
                                style={{ cursor: "pointer" }}
                              >
                                delete
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      {this.props.title}
                    </div>
                  </Typography>
                </CardContent>
              </Card>
            </CardContainer>
          </div>
        )}
      </Draggable>
    );
  }
}

export default StudentStatus;
