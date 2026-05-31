import {
  useState
} from "react";

import axios from "axios";

import {
  useNavigate,
  Link
} from "react-router-dom";


function CommonLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("student");


  const login = async () => {

    try {

      // =========================
      // ADMIN LOGIN
      // =========================

      if (role === "admin") {

        await axios.post(

          "http://127.0.0.1:5000/admin/login",

          {
            email,
            password
          }
        );

        navigate("/admin-dashboard");
      }

      // =========================
      // STUDENT LOGIN
      // =========================

      else {

        const response = await axios.post(

          "http://127.0.0.1:5000/student/login",

          {
            email,
            password
          }
        );

        localStorage.setItem(

          "student",

          JSON.stringify(
            response.data.student
          )
        );

        navigate("/student-dashboard");
      }

    } catch (error) {

      console.log(error);

      alert("Invalid Email or Password");
    }
  };


  return (

    <div

      style={{

        backgroundImage:
          "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3')",

        backgroundSize:"cover",

        backgroundPosition:"center",

        minHeight:"100vh",

        display:"flex",

        justifyContent:"center",

        alignItems:"center"
      }}
    >

      {/* DARK OVERLAY */}

      <div

        style={{

          backgroundColor:"rgba(0,0,0,0.6)",

          position:"absolute",

          top:0,

          left:0,

          width:"100%",

          height:"100%"
        }}
      ></div>


      {/* LOGIN CARD */}

      <div

        className="card shadow-lg p-5"

        style={{

          width:"500px",

          borderRadius:"20px",

          backdropFilter:"blur(10px)",

          backgroundColor:"rgba(255,255,255,0.95)",

          position:"relative",

          zIndex:1
        }}
      >

        <h1

          className="text-center mb-5"

          style={{

            fontWeight:"bold",

            color:"#0d6efd"
          }}
        >

          LMS Login

        </h1>


        {/* ROLE */}

        <select

          className="form-select mb-4"

          value={role}

          onChange={(e)=>
            setRole(e.target.value)
          }
        >

          <option value="student">

            Student

          </option>

          <option value="admin">

            Admin

          </option>

        </select>


        {/* EMAIL */}

        <input

          type="email"

          className="form-control form-control-lg mb-4"

          placeholder="Enter Email"

          value={email}

          onChange={(e)=>
            setEmail(e.target.value)
          }
        />


        {/* PASSWORD */}

        <input

          type="password"

          className="form-control form-control-lg mb-4"

          placeholder="Enter Password"

          value={password}

          onChange={(e)=>
            setPassword(e.target.value)
          }
        />


        {/* LOGIN BUTTON */}

        <button

          className="btn btn-primary btn-lg w-100"

          onClick={login}
        >

          Login

        </button>


        {/* REGISTER */}

        <div className="text-center mt-4">

          <Link
            to="/register"
          >

            New Student? Register

          </Link>

        </div>

      </div>

    </div>
  );
}

export default CommonLogin;