import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";


function StudentDashboard() {

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  const [tracking, setTracking] = useState([]);

  const student = JSON.parse(

    localStorage.getItem("student")
  );


  // =====================================
  // FETCH COURSES
  // =====================================

  const fetchCourses = async () => {

    try {

      const response = await axios.get(

        "http://127.0.0.1:5000/courses"
      );

      setCourses(response.data);

    } catch (error) {

      console.log(error);
    }
  };


  // =====================================
  // FETCH TRACKING
  // =====================================

  const fetchTracking = async () => {

    try {

      const response = await axios.get(

        `http://127.0.0.1:5000/student/tracking/${student.id}`
      );

      setTracking(response.data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchCourses();

    fetchTracking();

  }, [fetchCourses,fetchTracking]);


  // =====================================
  // START COURSE
  // =====================================

  const startCourse = async (course_id) => {

    try {

      await axios.post(

        "http://127.0.0.1:5000/start-course",

        {
          student_id: student.id,
          course_id: course_id
        }
      );

      alert("Course Started");

      navigate(`/course/${course_id}`);

    } catch (error) {

      console.log(error);

      alert("Failed To Start Course");
    }
  };


  // =====================================
  // LOGOUT
  // =====================================

  const logout = () => {

    localStorage.removeItem("student");

    navigate("/login");
  };


  return (

    <div className="container mt-5">

      <div className="d-flex justify-content-between">

        <h1>

          Student Dashboard

        </h1>

        <button
          className="btn btn-danger"
          onClick={logout}
        >

          Logout

        </button>

      </div>

      <hr />

      <div className="card p-4 mb-5 shadow">

        <h3>

          Student Profile

        </h3>

        <p>

          <b>Name:</b> {student.student_name}

        </p>

        <p>

          <b>Email:</b> {student.email}

        </p>

      </div>


      <h2 className="mb-4">

        Available Courses

      </h2>

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

                    {course.description}

                  </p>

                  <p>

                    <b>Trainer:</b>
                    {" "}
                    {course.trainer_name}

                  </p>

                  <button
                    className="btn btn-primary w-100"
                    onClick={() =>
                      startCourse(course.id)
                    }
                  >

                    Start

                  </button>

                </div>

              </div>

            </div>
          ))
        }

      </div>


      <hr className="my-5" />


      <h2>

        Learning Progress

      </h2>

      <div className="row mt-4">

        {

          tracking.map((t,index)=>(

            <div
              className="col-md-4 mb-4"
              key={index}
            >

              <div className="card p-4 shadow">

                <h4>

                  {t.course_name}

                </h4>

                <p>

                  <b>Status:</b>
                  {" "}
                  {t.status}

                </p>

                <p>

                  <b>Progress:</b>
                  {" "}
                  {t.progress}%

                </p>

                <p>

                  <b>Score:</b>
                  {" "}
                  {t.score}

                </p>

                <p>

                  <b>Badge:</b>
                  {" "}
                  {t.badge}

                </p>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default StudentDashboard;
