import "./app.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import NotFound from "./pages/notfound/NotFound";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import ActivateEmail from "./pages/activateemail/ActivateEmail";
import { useEffect } from "react";
import { getToken, getUser } from "./actions/auth";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import Profile from "./pages/profile/Profile";

const App = () => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    const lsAuth = localStorage.getItem("auth");
    if (lsAuth) {
      dispatch(getToken());
    }
  }, [auth.auth, dispatch]);
  useEffect(() => {
    if (auth.token) {
      dispatch(getUser());
    }
  }, [auth.token, dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={auth.auth ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={auth.auth ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/reset/:resetToken" element={<ResetPassword />} />
        <Route
          path="/users/activate/:activationToken"
          element={<ActivateEmail />}
        />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Home type="movie" />} />
          <Route path="/series" element={<Home type="series" />} />
          <Route path="/watch" element={<Watch />} />

          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
