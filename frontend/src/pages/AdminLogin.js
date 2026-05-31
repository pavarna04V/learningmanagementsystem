import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const nav = useNavigate();

  const login = () => {
    axios.post("http://127.0.0.1:5000/admin/login", {
      username, password
    }).then(() => nav("/admin-dashboard"))
      .catch(() => alert("Invalid"));
  };

  return (
    <div className="container mt-5">
      <h2>Admin Login</h2>
      <input className="form-control mb-2" onChange={e => setU(e.target.value)} />
      <input className="form-control mb-2" type="password" onChange={e => setP(e.target.value)} />
      <button className="btn btn-primary" onClick={login}>Login</button>
    </div>
  );
}

export default AdminLogin;