import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "./pages/components/Footer.jsx";
import Home from "./pages/HOME/Home.jsx";
import NotFound from "./pages/components/NotFound.jsx";
import Ads from "./pages/ADS/Ads.jsx";
import "./App.css";
import Experiment from "./pages/Experiment/Experiment.jsx";
import ViewDetails from "./pages/ADS/ViewDetails.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import PublicRoute from "./Routes/PublicRoute.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/exp",
          element: <Experiment />,
        },
        {
          path: "/ads",
          element: <Ads />,
        },
        {
          path: "/view-detail",
          element: <ViewDetails />,
        },
      ],
    },
    {
      path: "/",
      element: <PublicRoute />, // Public routes wrapper
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />

      {/* <Footer /> */}
    </div>
  );
};

export default App;
