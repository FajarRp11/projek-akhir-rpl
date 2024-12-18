import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./app.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Team from "./pages/Team.jsx";
import Budaya from "./pages/budaya.jsx";
import DetailBudaya from "./pages/detailBudaya.jsx";
import NilaiLuhur from "./pages/nilai-luhur.jsx";
import Login from "./pages/login.jsx";
import Contact from "./pages/contact-us.jsx";
import Dashboard from "./pages/dashboard.jsx";
import EditBudaya from "./pages/editBudaya.jsx";
import AddBudaya from "./pages/tambahData.jsx";

const routes = createBrowserRouter([
  {
    path: "/team",
    element: <Team />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/budayas",
    element: <Budaya />,
  },
  {
    path: "/budaya/:id",
    element: <DetailBudaya />,
  },
  {
    path: "/nilai-luhur",
    element: <NilaiLuhur />,
  },
  {
    path: "/contact-us",
    element: <Contact />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/edit-budaya/:id",
    element: <EditBudaya />,
  },
  {
    path: "/tambah-budaya",
    element: <AddBudaya />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
