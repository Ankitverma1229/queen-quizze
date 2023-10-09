import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login.js";
import Signup from "./pages/SignUp/Signup.js";
import AddVideo from "./pages/AddVideo/AddVideoForm.jsx";
import AddQuestion from "./pages/AddQuestion/AddQuestion.jsx";
import Videos from "./pages/Videos/Videos.js";
import Applicants from "./pages/Applicants/Applicants.jsx";
import Category from "./pages/VideoCategory/Category.jsx";
import CreateQuiz from "./pages/CreateQuiz/CreateQuiz.jsx";
import ForgotPassword from "./pages/Forgotpassword/ForgotPassword.jsx";
import CreateNewPassword from "./pages/Forgotpassword/CreateNewPassword.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import PreviewPage from "./pages/PreviewPage/PreviewPage.jsx";
import ProtectedRoutes from "./ProtectedRoutes.js";
import { useState } from "react";

const Router = () => {
  const [isActivePage, setIsActivePage] = useState(1);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/create-new-password/:id/:token"
          element={<CreateNewPassword />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Applicants />} path="/applicants" />
          <Route element={<Category />} path="/category" />
          <Route path="/home" element={<Videos />} />
          <Route
            path="/home/add-video"
            element={<AddVideo isActivePage={isActivePage} />}
          />
          <Route
            path="/home/create-quiz/:video_id"
            element={<CreateQuiz isActivePage={isActivePage} />}
          />
          <Route
            path="/home/add-question/:quiz_id"
            element={<AddQuestion isActivePage={isActivePage} />}
          />
          <Route
            exact
            path="preview-page/:question_id"
            element={<PreviewPage />}
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
