import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default class StudentDetails extends Component {
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
  render() {
    return (
     
        <div>
          <form className="container">
            <div className="form-group">
              <label htmlFor="firstname">first name</label>
              <input
                disabled
                className="form-control"
                type="text"
                onChange={this.handleFirstnameChange}
                value={this.state.firstname}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">last name</label>
              <input
                disabled
                className="form-control"
                type="text"
                onChange={this.handleLastnameChange}
                value={this.state.lastname}
              />
            </div>
            <div className="form-group">
              <label htmlFor="studentid">student ID</label>
              <input
                disabled
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
                disabled
                className="form-control"
                id="phonenumber"
                type="number"
                onChange={this.handlePhonenumberChange}
                value={this.state.phonenumber}
              />
            </div>

            <div className="form-group">
              <label>student status: </label>
              <br></br>
              <div className="container radioButton">
                <input
                  disabled
                  type="radio"
                  name="radio"
                  onChange={this.handleStatusChange}
                  checked={this.state.status === "active"}
                  value={this.state.status}
                />
                Active
                <input
                  disabled
                  type="radio"
                  name="radio"
                  onChange={this.handleStatusChange}
                  checked={this.state.status === "delinquent"}
                  value={this.state.status}
                />
                Delinquent
                <input
                  disabled
                  type="radio"
                  name="radio"
                  onChange={this.handleStatusChange}
                  checked={this.state.status === "dropped"}
                  value={this.state.status}
                />
                Dropped
              </div>
            </div>
            <Link
              to="/"
              className="btn btn-default"
              style={{
                backgroundColor: "#3F51B5",
                borderRadius: "4px",
                border: "1px solid #fff",
                color: "#fff",
              }}
            >
              Back to Student Records Table
            </Link>
          </form>
        </div>
    );
  }
}
