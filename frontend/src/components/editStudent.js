import React, { Component } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

export default class EditStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registerError: "",
      loading: "",
      firstname: "",
      lastname: "",
      studentid: "",
      phonenumber: "",
      status: true,
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:7000/registration/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          studentid: response.data.studentid,
          phonenumber: response.data.phonenumber,
          status: response.data.status,
        });
      });
  }
  handleFirstnameChange = (event) => {
    this.setState({
      firstname: event.target.value,
    });
  };
  handleLastnameChange = (event) => {
    this.setState({
      lastname: event.target.value,
    });
  };
  handleStudentIdChange = (event) => {
    this.setState({
      studentid: event.target.value,
    });
  };
  handlePhonenumberChange = (event) => {
    this.setState({
      phonenumber: event.target.value,
    });
  };
  handleStatusChange = (event) => {
    this.setState({
      status: event.target.value,
    });
  };
  handleSubmitStudent = (event) => {
    event.preventDefault();
    const registerStudent = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      studentid: this.state.studentid,
      phonenumber: this.state.phonenumber,
      status: this.state.status,
    };

    axios
      .post(
        `http://localhost:7000/registration/update/${this.props.match.params.id}`,
        registerStudent
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  };
  render() {
    return (
      <aside>
        <div>
          <form className="container">
            <div className="form-group">
              <label htmlFor="firsttname">first name</label>
              <input
                className="form-control"
                type="text"
                onChange={this.handleFirstnameChange}
                value={this.state.firstname}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">last name</label>
              <input
                className="form-control"
                type="text"
                onChange={this.handleLastnameChange}
                value={this.state.lastname}
              />
            </div>
            <div className="form-group">
              <label htmlFor="studentid">student ID</label>
              <input
                className="form-control"
                id="studentid"
                type="number"
                onChange={this.handleStudentIdChange}
                value={this.state.studentid}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phonenumber">phone number</label>
              <input
                className="form-control"
                id="phonenumber"
                type="number"
                onChange={this.handlePhonenumberChange}
                value={this.state.phonenumber}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">student status: </label>
              <br></br>
              <input
                type="radio"
                name="radio"
                onChange={this.handleStatusChange}
                checked={this.state.status === "active"}
                value={"active"}
              />
              Active
              <input
                type="radio"
                name="radio"
                onChange={this.handleStatusChange}
                checked={this.state.status === "delinquent"}
                value={"delinquent"}
              />
              Delinquent
              <input
                type="radio"
                name="radio"
                onChange={this.handleStatusChange}
                checked={this.state.status === "dropped"}
                value={"dropped"}
                // value={this.state.status}
              />
              Dropped
            </div>
            <button onClick={this.handleSubmitStudent}>Update</button>
          </form>
        </div>
      </aside>
    );
  }
}
