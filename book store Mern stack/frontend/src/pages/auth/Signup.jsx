import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader";

export default function Signup() {
  const navigate = useNavigate();
  const buttonRef = useRef();
  const [loading, setLoading] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    buttonRef.current.disabled = true;
    const formdata = new FormData(e.currentTarget);
    const data = Object.fromEntries(formdata);

    axios
      .post("user/signup", {
        email: data.email,
        name: data.name,
        password: data.password,
      })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
          toast.error(res.data.error);
        } else {
          console.log(res.data.sucess);
          toast.success(res.data.sucess);
          navigate("/login");
        }
        setLoading(false);
        buttonRef.current.disabled = false;
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        buttonRef.current.disabled = false;
      });
  }
  function check() {
    console.log("haii");
  }
  return (
    <div className="form stack">
      <h1>signup</h1>
      <form onSubmit={handleSubmit}>
        {loading && <Loader />}
        <div className="group">
          <label htmlFor="email">E mail</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="group">
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="group">
          {" "}
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className="cta">
          <button ref={buttonRef} onClick={check}>
            register
          </button>
          <Link to="/login">already registered ?</Link>
        </div>
      </form>
    </div>
  );
}
