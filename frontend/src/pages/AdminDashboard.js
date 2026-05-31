import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";


function AdminDashboard() {

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  const [students, setStudents] = useState([]);

  const [course_name, setCourseName] = useState("");

  const [duration, setDuration] = useState("");

  const [trainer_name, setTrainerName] = useState("");

  const [image, setImage] = useState("");

  const [description, setDescription] = useState("");

  const [student_name, setStudentName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  // ======================================
  // FETCH COURSES
  // ======================================

  const fetchCourses = async () => {

    const response = await axios.get(

      "http://127.0.0.1:5000/courses"
    );

    setCourses(response.data);
  };


  // ======================================
  // FETCH STUDENTS
  // ======================================

  const fetchStudents = async () => {

    const response = await axios.get(

      "http://127.0.0.1:5000/students"
    );

    setStudents(response.data);
  };


  useEffect(() => {

    fetchCourses();

    fetchStudents();

  }, []);


  // ======================================
  // ADD COURSE
  // ======================================

  const addCourse = async () => {

    try {

      await axios.post(

        "http://127.0.0.1:5000/courses",

        {
          course_name,
          duration,
          trainer_name,
          image,
          description
        }
      );

      alert("Course Added");

      setCourseName("");

      setDuration("");

      setTrainerName("");

      setImage("");

      setDescription("");

      fetchCourses();

    } catch (error) {

      console.log(error);

      alert("Failed To Add Course");
    }
  };


  // ======================================
  // DELETE COURSE
  // ======================================

  const deleteCourse = async (id) => {

    await axios.delete(

      `http://127.0.0.1:5000/courses/${id}`
    );

    fetchCourses();
  };


  // ======================================
  // ADD STUDENT
  // ======================================

  const addStudent = async () => {

    try {

      await axios.post(

        "http://127.0.0.1:5000/students",

        {
          student_name,
          email,
          password
        }
      );

      alert("Student Added");

      setStudentName("");

      setEmail("");

      setPassword("");

      fetchStudents();

    } catch (error) {

      console.log(error);

      alert("Failed To Add Student");
    }
  };


  // ======================================
  // DELETE STUDENT
  // ======================================

  const deleteStudent = async (id) => {

    await axios.delete(

      `http://127.0.0.1:5000/students/${id}`
    );

    fetchStudents();
  };


  // ======================================
  // LOGOUT
  // ======================================

  const logout = () => {

    navigate("/login");
  };


  return (

    <div className="container-fluid">

      <div className="row">

        {/* SIDEBAR */}

        <div
          className="col-md-2 bg-dark text-white p-4"
          style={{
            minHeight:"100vh"
          }}
        >

          <h2>

            LMS Admin

          </h2>

          <hr />

          <button
            className="btn btn-danger w-100"
            onClick={logout}
          >

            Logout

          </button>

        </div>


        {/* MAIN */}

        <div className="col-md-10 p-4">

          <h1>

            Admin Dashboard

          </h1>

          <hr />


          {/* ADD COURSE */}

          <div className="card p-4 shadow mb-5">

            <h3>

              Add Course

            </h3>

            <input
              className="form-control mb-3"
              placeholder="Course Name"
              value={course_name}
              onChange={(e)=>
                setCourseName(e.target.value)
              }
            />

            <input
              className="form-control mb-3"
              placeholder="Duration"
              value={duration}
              onChange={(e)=>
                setDuration(e.target.value)
              }
            />

            <input
              className="form-control mb-3"
              placeholder="Trainer Name"
              value={trainer_name}
              onChange={(e)=>
                setTrainerName(e.target.value)
              }
            />

            <input
              className="form-control mb-3"
              placeholder="Image URL"
              value={image}
              onChange={(e)=>
                setImage(e.target.value)
              }
            />

            <textarea
              className="form-control mb-3"
              placeholder="Description"
              value={description}
              onChange={(e)=>
                setDescription(e.target.value)
              }
            />

            <button
              className="btn btn-primary"
              onClick={addCourse}
            >

              Add Course

            </button>

          </div>


          {/* COURSES */}

          <div className="row">

            {

              courses.map((course)=>(

                <div
                  className="col-md-4 mb-4"
                  key={course.id}
                >

                  <div className="card shadow">

                    <img
                      src={course.image}
                      alt=""
                      style={{
                        height:"200px",
                        objectFit:"cover"
                      }}
                    />

                    <div className="card-body">

                      <h4>

                        {course.course_name}

                      </h4>

                      <p>

                        {course.duration}

                      </p>

                      <p>

                        {course.trainer_name}

                      </p>

                      <p>

                        {course.description}

                      </p>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          deleteCourse(course.id)
                        }
                      >

                        Delete

                      </button>

                    </div>

                  </div>

                </div>
              ))
            }

          </div>


          <hr />


          {/* ADD STUDENT */}

          <div className="card p-4 shadow mb-5">

            <h3>

              Add Student

            </h3>

            <input
              className="form-control mb-3"
              placeholder="Student Name"
              value={student_name}
              onChange={(e)=>
                setStudentName(e.target.value)
              }
            />

            <input
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e)=>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e)=>
                setPassword(e.target.value)
              }
            />

            <button
              className="btn btn-success"
              onClick={addStudent}
            >

              Add Student

            </button>

          </div>


          {/* STUDENTS */}

          <div className="row">

            {

              students.map((student)=>(

                <div
                  className="col-md-4 mb-4"
                  key={student.id}
                >

                  <div className="card p-3 shadow">

                    <h5>

                      {student.student_name}

                    </h5>

                    <p>

                      {student.email}

                    </p>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        deleteStudent(student.id)
                      }
                    >

                      Delete

                    </button>

                  </div>

                </div>
              ))
            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;