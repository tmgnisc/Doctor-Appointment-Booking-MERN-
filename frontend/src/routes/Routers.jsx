import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import MyAccount from "../Dashboard/user-accont/MyAccount";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutSuccess from "../pages/Doctors/CheckoutSuccess";

// 🆕 Admin components
import AdminDashboard from "../AdminDashboard/AdminAccount/AdminDashboard";
import AdminHome from "../AdminDashboard/AdminAccount/AdminHome";
import DoctorList from "../AdminDashboard/AdminAccount/DoctorList";
import DoctorDetailsAdmin from "../AdminDashboard/AdminAccount/DoctorDetailsAdmin";

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />

        {/* 🛡️ Protected User Dashboard */}
        <Route
          path="/users/profile/me"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <MyAccount />
            </ProtectedRoute>
          }
        />

        {/* 🛡️ Protected Doctor Dashboard */}
        <Route
          path="/doctors/profile/me"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="doctors" element={<DoctorList />} />
          <Route path="/admin/doctors/:id" element={<DoctorDetails />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Routers;
