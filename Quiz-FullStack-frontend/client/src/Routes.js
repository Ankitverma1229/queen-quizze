import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/SignUp.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.js";
import PreviewPage from "./pages/PreviewPage/PreviewPage.jsx";
import ProtectedRoutes from "./ProtectedRoutes.js";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import ResultPage from "./pages/ResultPage/ResultPage.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./pages/ForgotPassword/ResetPassword.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/create-new-password/:id/:token"
          element={<ResetPassword />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route path="preview-page/:question_id" element={<PreviewPage />} />
          <Route exact path="/result/:userId" element={<ResultPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
