import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Books from "./pages/books";
import AlterBook from "./pages/AlterBook";
import RootLayout from "./pages/RootLayout";
import Book from "./pages/Book";
import Error from "./pages/Error";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AuthContext from "./store/AuthContext";
import RouteProtector from "./RouteProtector";
import Mybooks from "./pages/Mybooks";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Books /> },
      {
        path: "/add",
        element: (
          <RouteProtector>
            <AlterBook />
          </RouteProtector>
        ),
      },
      {
        path: "/book/:id",
        element: (
          <RouteProtector>
            <Book />
          </RouteProtector>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <RouteProtector>
            <AlterBook />
          </RouteProtector>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/mybooks", element: <Mybooks /> },
    ],
  },
]);
export default function App() {
  return (
    <AuthContext>
      <RouterProvider router={routes} />;
    </AuthContext>
  );
}
