import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="container text-center mt-5">

      <h1 className="display-2 mb-5">

        Learning Management System

      </h1>

      <Link to="/login">

        <button className="btn btn-primary btn-lg">

          Login

        </button>

      </Link>

    </div>
  )
}

export default Home;