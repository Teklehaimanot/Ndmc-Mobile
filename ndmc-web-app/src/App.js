import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "./pages/AuthLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
// import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./state/auth/authSlice";
import ProtectedRoutes from "./components/ProtectedRoutes";
import User from "./pages/User";
import Dashboard from "./pages/Dashboard";
import UserRegister from "./components/user/UserRegister";
import UserManagement from "./components/user/UserManagement";
import UserUpdate from "./components/user/UserUpdate";
import News from "./pages/News";
import NewsAndEvents from "./components/news/NewsAndEvents";
import NewsRegister from "./components/news/NewsRegister";
import NewsUpdate from "./components/news/NewsUpdate";
import EvidenceBrief from "./pages/EvidenceBrief";
import EvidenceBriefs from "./components/evidenceBrief/EvidenceBriefs";
import EvidenceBriefRegister from "./components/evidenceBrief/EvidenceBriefRegister";
import EvidenceBriefUpdate from "./components/evidenceBrief/EvidenceBriefUpdate";
import AboutNdmc from "./pages/AboutNdmc";
import About from "./components/aboutNdmc/About";
import AboutUpdate from "./components/aboutNdmc/AboutUpdate";
import Collaborator from "./pages/Collaborator";
import Collaborators from "./components/collaborator/Collaborators";
import CollaboratorRegister from "./components/collaborator/CollaboratorRegister";
import CollaboratorUpdate from "./components/collaborator/CollaboratorUpdate";
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
            <Route path="user" element={<User />}>
              <Route index element={<UserManagement />} />
              <Route path="register" element={<UserRegister />} />
              <Route path=":userId" element={<UserUpdate />}></Route>
            </Route>
            <Route path="news" element={<News />}>
              <Route index element={<NewsAndEvents />} />
              <Route path="register" element={<NewsRegister />} />
              <Route path=":newsId" element={<NewsUpdate />}></Route>
            </Route>
            <Route path="evidenceBrief" element={<EvidenceBrief />}>
              <Route index element={<EvidenceBriefs />} />
              <Route path="register" element={<EvidenceBriefRegister />} />
              <Route
                path=":evidenceBriefId"
                element={<EvidenceBriefUpdate />}
              ></Route>
            </Route>
            <Route path="about" element={<AboutNdmc />}>
              <Route index element={<About />} />
              <Route path="update" element={<AboutUpdate />} />
            </Route>
            <Route path="collaborator" element={<Collaborator />}>
              <Route index element={<Collaborators />} />
              <Route path="register" element={<CollaboratorRegister />} />
              <Route
                path=":collaboratorId"
                element={<CollaboratorUpdate />}
              ></Route>
            </Route>
          </Route>
        </Route>
        <Route
          path="/auth"
          element={!isAuthenticated ? <AuthLayout /> : <Navigate to="/" />}
        >
          <Route index element={<Login />} />
          {/* <Route path="signUp" element={<SignUp />} /> */}
        </Route>
        <Route
          path="*"
          element={!isAuthenticated ? <NotFound /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
