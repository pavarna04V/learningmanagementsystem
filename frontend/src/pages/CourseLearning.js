import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useParams
} from "react-router-dom";


function CourseLearning() {

  const { course_id } = useParams();

  const [levels, setLevels] = useState([]);

  const student = JSON.parse(

    localStorage.getItem("student")
  );


  // ======================================
  // FETCH LEVELS
  // ======================================

  const fetchLevels = async () => {

    try {

      const response = await axios.get(

        `http://127.0.0.1:5000/course-levels/${course_id}`
      );

      setLevels(response.data);

    } catch (error) {

      console.log(error);
    }
  };


  // ======================================
  // LOAD LEVELS
  // ======================================

  useEffect(() => {

    fetchLevels();

  }, [course_id,fetchLevels]);


  // ======================================
  // COMPLETE LEVEL
  // ======================================

  const completeLevel = async (level) => {

    try {

      await axios.post(

        "http://127.0.0.1:5000/complete-level",

        {
          student_id: student.id,
          course_id: course_id,
          level_id: level.id,
          obtained_score: level.level_score
        }
      );

      alert("Assignment Submitted");

    } catch (error) {

      console.log(error);

      alert("Already Completed");
    }
  };


  return (

    <div className="container mt-5">

      <h1 className="mb-5">

        Course Learning

      </h1>

      {

        levels.length === 0 ?

        (

          <h3>

            No Levels Added Yet

          </h3>

        )

        :

        (

          <div className="row">

            {

              levels.map((level)=>(

                <div
                  className="col-md-6 mb-4"
                  key={level.id}
                >

                  <div className="card p-4 shadow">

                    <h2>

                      {level.level_name}

                    </h2>

                    <hr />

                    <h4>

                      Topic

                    </h4>

                    <p>

                      {level.topic}

                    </p>

                    <h4>

                      Notes

                    </h4>

                    <p>

                      {level.notes}

                    </p>

                    <h4>

                      Assignment

                    </h4>

                    <div
                      className="bg-light p-3 rounded"
                    >

                      {level.assignment}

                    </div>

                    <h5 className="mt-3">

                      Score:
                      {" "}
                      {level.level_score}

                    </h5>

                    <button
                      className="btn btn-success mt-4"
                      onClick={() =>
                        completeLevel(level)
                      }
                    >

                      Submit Assignment

                    </button>

                  </div>

                </div>
              ))
            }

          </div>
        )
      }

    </div>
  );
}

export default CourseLearning;
