import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import CommonLogin from "./pages/CommonLogin";

import StudentRegister from "./pages/StudentRegister";

import AdminDashboard from "./pages/AdminDashboard";

import StudentDashboard from "./pages/StudentDashboard";

import CourseLearning from "./pages/CourseLearning";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<CommonLogin />}
        />

        <Route
          path="/login"
          element={<CommonLogin />}
        />

        {/* REGISTER */}

        <Route
          path="/register"
          element={<StudentRegister />}
        />

        {/* ADMIN */}

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        {/* STUDENT */}

        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />

        {/* COURSE LEARNING */}

        <Route
          path="/course/:course_id"
          element={<CourseLearning />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;