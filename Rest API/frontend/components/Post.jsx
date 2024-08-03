import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function Post() {
  const [postData, setPostData] = useState([]);
  const parsms = useParams();
  const id = parsms.id;
  function fetchData() {
    fetch(`http://localhost:8080/post/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((x) => {
        return setPostData((prev) => [x]);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>haa</h1>
      <h1>{postData[0]?.title}</h1>
      <h3>{postData[0]?.discription}</h3>
    </div>
  );
}
