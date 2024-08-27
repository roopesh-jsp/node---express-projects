import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
export default function Login() {
  const { login } = useAuth();
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
      .post("/user/login", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          toast.success(res.data.sucess);
          login(res.data.name, res.data.token);
          navigate("/", { replace: true });
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

  return (
    <div className="form stack">
      <h1>Login</h1>
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
        <div className="cta">
          <button ref={buttonRef}>logIn</button>
          <Link to="/signup">didn't have a account ?</Link>
        </div>
      </form>
    </div>
  );
}
