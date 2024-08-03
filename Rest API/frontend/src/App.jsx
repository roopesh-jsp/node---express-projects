import React from "react";
import Home from "../components/Home";
import AddPost from "../components/AddPost";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Post from "../components/Post";
import UpdatePost from "../components/UpdatePost";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/create", element: <AddPost /> },
  { path: "/post/:id", element: <Post /> },
  { path: "/update/:id", element: <UpdatePost /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
