import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoute from "./Routes/user";
import './App.css'

function App() { 
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/*" element={<UserRoute />} /> 
                </Routes>
            </Router>
        </div>
    );
}

export default App;
