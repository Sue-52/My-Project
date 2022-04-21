import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import HomePage from "./HomePage/HomePage";
import EditArticle from "./HomePage/EditArticle";
import { useEffect } from "react";
import HomeContent from "./HomePage/components/HomeContent";

function Redirect({ to }) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />}>
            <Route path="home" element={<HomeContent />} />
            <Route path="article" element={<EditArticle />} />
            <Route path="publish" />
          </Route>
          <Route path="/" element={<Redirect to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
