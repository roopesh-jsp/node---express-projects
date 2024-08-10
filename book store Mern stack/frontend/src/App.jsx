import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Books from "./pages/books";
import AlterBook from "./pages/AlterBook";
import RootLayout from "./pages/RootLayout";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Books /> },
      { path: "/add", element: <AlterBook /> },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={routes} />;
}
