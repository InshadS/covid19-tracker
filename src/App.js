import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Header from "./Components/Header";
import India from "./Components/India";
import World from "./Components/World";
class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="container-fluid">
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<India />} />
            <Route path="/India" element={<India />} />
            <Route path="/World" element={<World />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
