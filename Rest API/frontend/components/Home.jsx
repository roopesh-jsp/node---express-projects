import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  function fetchData() {
    fetch("http://localhost:8080/posts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return setData(data);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  function handleDel(id) {
    axios
      .delete("http://localhost:8080/delete/" + id)
      .then((x) => {
        fetchData();
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <main>
        {/* <button onClick={fetchData}>GET</button> */}
        <button>
          <Link to="/create">Post</Link>
        </button>
      </main>
      <div className="container">
        {data.map((el, idx) => (
          <div key={idx}>
            <h1>
              {" "}
              <Link to={`/post/${el._id}`}>{el.title}</Link>
              <button>
                <Link to={`/update/${el._id}`}>update</Link>
              </button>
              <button onClick={() => handleDel(el._id)}>del</button>
            </h1>
          </div>
        ))}
      </div>
    </>
  );
}
