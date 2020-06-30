import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateStudent from "./components/createStudent";
import EditStudent from "./components/editStudent";
import StudentDetails from "./components/StudentDetails";
import StudentTable from "./components/student_table";

function App() {
  return (
    <Router>
      <Route path="/" exact component={CreateStudent} />
      <Route path="/detail/:id" exact component={StudentDetails} />
      <Route path="/" exact component={StudentTable} />
      <Route path="/:id" exact component={EditStudent} />
    </Router>
  );
}

export default App;
