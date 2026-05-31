import React, {
  useState
} from "react";

import axios from "axios";


function AddCourse() {

  const [course_name, setCourse] = useState("");

  const [duration, setDuration] = useState("");

  const [trainer_name, setTrainer] = useState("");

  const [image, setImage] = useState("");

  const [description, setDescription] = useState("");


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

      setCourse("");

      setDuration("");

      setTrainer("");

      setImage("");

      setDescription("");
    }

    catch {

      alert("Failed");
    }
  };


  return (

    <div className="container mt-5">

      <div className="card shadow-lg p-5">

        <h1 className="mb-5">

          Add Course

        </h1>


        <input
          className="form-control mb-3"
          placeholder="Course Name"
          value={course_name}
          onChange={(e)=>
            setCourse(e.target.value)
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
            setTrainer(e.target.value)
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

    </div>
  );
}

export default AddCourse;