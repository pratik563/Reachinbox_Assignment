/* import { useState } from "react"; */
import React from "react";
import Login from "./Login";
import Onebox from "./Onebox";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  /* const [count, setCount] = useState(0); */

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/onebox" element={<Onebox />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
