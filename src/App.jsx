import "./App.css";
import CardComponent from "./components/CardComponent";
import Login from "./components1/Login";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import { SimpleGrid } from "@chakra-ui/react";
import Politics from "./Pages/Politics";
import { AdminPage } from "./components1/AdminPage";

import SingleNewsPage from "./components/SingleNewsPage";
import General from "./Pages/General";
import Health from "./Pages/Health";
import Business from "./Pages/Business";
import Entertainment from "./Pages/Entertainment";
import Science from "./Pages/Science";
import Sports from "./Pages/Sports";
import Technology from "./Pages/Technology";
import DashBoard from "./Pages/DashBoard";
import PrivateRoute from "./Routes/PrivateRoute";
// import Contact from "./Pages/Contact";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SignupForm from "./components1/SignUp";
import ContactPage from "./Pages/ContactPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/general" element={<General />} />
        <Route path="/business" element={<Business />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/science" element={<Science />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/health" element={<Health />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/health" element={<Health />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {" "}
              <DashBoard />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              {" "}
              <AdminPage />{" "}
            </PrivateRoute>
          }
        />

        <Route path="/:category/:id" element={<SingleNewsPage />} />
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
