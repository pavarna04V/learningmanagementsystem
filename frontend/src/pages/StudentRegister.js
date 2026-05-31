import {
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";


function StudentRegister() {

  const navigate = useNavigate();

  const [student_name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  const register = async () => {

    try {

      const response = await axios.post(

        "http://127.0.0.1:5000/student/register",

        {
          student_name,
          email,
          password
        }
      );

      alert(response.data.message);

      navigate("/login");

    }

    catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };


  return (

    <div className="container mt-5">

      <div
        className="card p-5 shadow-lg mx-auto"
        style={{
          width:"700px"
        }}
      >

        <h1 className="text-center mb-5">

          Student Register

        </h1>


        <input
          className="form-control mb-4"
          placeholder="Student Name"
          onChange={(e)=>
            setName(e.target.value)
          }
        />


        <input
          type="email"
          className="form-control mb-4"
          placeholder="Email"
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />


        <input
          type="password"
          className="form-control mb-4"
          placeholder="Password"
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />


        <button
          className="btn btn-success btn-lg"
          onClick={register}
        >

          Register

        </button>

      </div>

    </div>
  );
}

export default StudentRegister;