import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "./pages/AuthLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./state/auth/authSlice";
import ProtectedRoutes from "./components/ProtectedRoutes";
import User from "./pages/User";
import Dashboard from "./pages/Dashboard";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userObj = JSON.parse(token);
    if (token) {
      dispatch(login({ token: userObj.token, user: userObj.user }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="/user" element={<User />} />
          </Route>
        </Route>
        <Route
          path="/auth"
          element={!isAuthenticated ? <AuthLayout /> : <Navigate to="/" />}
        >
          <Route index element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
        </Route>
        {/* <Route element={<ProtectedRoutes />}>
          <Route path="/user" element={<User />} />
        </Route> */}
        <Route
          path="*"
          element={!isAuthenticated ? <NotFound /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
