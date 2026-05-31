import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link
} from "react-router-dom";

function StudentLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const response = await axios.post(

        "http://127.0.0.1:5000/student/login",

        {
          email,
          password
        }
      );

      localStorage.setItem(
        "student",
        JSON.stringify(response.data.student)
      );

      alert("Login Success");

      navigate("/student-dashboard");

    } catch (error) {

      alert("Invalid Email or Password");
    }
  };

  return (

    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3')",

        backgroundSize: "cover",

        backgroundPosition: "center",

        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center"
      }}
    >

      <div
        className="card shadow-lg p-5"
        style={{
          width: "700px",

          minHeight: "450px",

          borderRadius: "25px",

          backgroundColor: "rgba(255,255,255,0.97)"
        }}
      >

        <h1
          className="text-center mb-5"
          style={{
            fontSize: "45px",
            fontWeight: "bold"
          }}
        >

          Student Login

        </h1>

        <input
          type="email"
          className="form-control form-control-lg mb-4"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="form-control form-control-lg mb-4"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="btn btn-primary btn-lg w-100"
          style={{
            height: "60px",
            fontSize: "22px",
            borderRadius: "12px"
          }}
          onClick={login}
        >

          Login

        </button>

        <div
          className="text-center mt-4"
          style={{
            fontSize: "18px"
          }}
        >

          <Link to="/student-register">

            Don't have account? Register

          </Link>

        </div>

      </div>

    </div>
  );
}

export default StudentLogin;