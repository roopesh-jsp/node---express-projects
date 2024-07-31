import React, { useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  function fetchData() {
    fetch("http://localhost:8080/posts")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return setData(data);
      });
  }
  console.log(data);
  return (
    <>
      <main>
        <button onClick={fetchData}>GET</button>
        <button>POST</button>
      </main>
      <div className="container">
        {data.map((el, idx) => (
          <div key={idx}>
            <h1>{el.title}</h1>
          </div>
        ))}
      </div>
    </>
  );
}
