import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";


function Courses() {

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  const [courses, setCourses] = useState([]);


  const fetchCourses = async () => {

    const response = await axios.get(
      "http://127.0.0.1:5000/courses"
    );

    setCourses(response.data);
  };


  useEffect(() => {

    fetchCourses();

  }, []);


  const enrollCourse = async (course_id) => {

    try {

      await axios.post(
        "http://127.0.0.1:5000/enroll",
        {
          student_id: student.id,
          course_id: course_id
        }
      );

      alert("Enrollment Success");

    }

    catch {

      alert("Already Enrolled");
    }
  };


  return (

    <div className="container mt-5">

      <h1 className="mb-5 text-center">

        Available Courses

      </h1>


      <div className="row">

        {

          courses.map((course)=>(

            <div
              className="col-md-4 mb-4"
              key={course.id}
            >

              <div className="card shadow-lg">

                <img
                  src={course.image}
                  alt=""
                  style={{
                    height:"250px",
                    objectFit:"cover"
                  }}
                />

                <div className="card-body">

                  <h3>

                    {course.course_name}

                  </h3>

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
                    className="btn btn-success w-100"
                    onClick={()=>
                      enrollCourse(course.id)
                    }
                  >

                    Enroll

                  </button>

                </div>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default Courses;