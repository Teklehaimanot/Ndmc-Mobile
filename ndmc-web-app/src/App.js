import { Routes, Route, BrowserRouter } from "react-router-dom";
import AuthLayout from "./pages/AuthLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
