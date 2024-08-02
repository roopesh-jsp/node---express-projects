import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);

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
              <Link to={`/post/${el._id}`}>{el.title}</Link>{" "}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
}
