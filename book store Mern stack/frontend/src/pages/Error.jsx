import React from "react";
import { useRouteError, Link } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>error</h1>
      <Link to="/">go to home</Link>
    </div>
  );
}
