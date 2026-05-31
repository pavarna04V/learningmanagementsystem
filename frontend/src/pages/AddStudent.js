import {
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";


function AddStudent() {

  const navigate = useNavigate();

  const [student_name, setStudentName] = useState("");

  const [email, setEmail] = useState("");

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");


  const addStudent = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:5000/students",
        {
          student_name,
          email,
          username,
          password
        }
      );

      alert("Student Added");

      navigate("/admin-dashboard");

    }

    catch {

      alert("Error");
    }
  };


  return (

    <div className="container mt-5">

      <div className="card shadow-lg p-5">

        <h1 className="mb-4">

          Add Student

        </h1>


        <input
          className="form-control mb-3"
          placeholder="Student Name"
          onChange={(e)=>
            setStudentName(e.target.value)
          }
        />


        <input
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />


        <input
          className="form-control mb-3"
          placeholder="Username"
          onChange={(e)=>
            setUsername(e.target.value)
          }
        />


        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />


        <button
          className="btn btn-primary"
          onClick={addStudent}
        >

          Add Student

        </button>

      </div>

    </div>
  );
}

export default AddStudent;