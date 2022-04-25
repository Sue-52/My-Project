import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// 组件获取
import LoginPage from "./LoginPage/LoginPage";
import HomePage from "./HomePage/HomePage";
import EditArticle from "./HomePage/components/EditArticle";
import HomeContent from "./HomePage/components/HomeContent";
import PubArticle from "./HomePage/components/PubArticle";

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
          <Route path="/home" element={<HomePage />}>
            <Route path="" element={<HomeContent />} />
            <Route path="article" element={<EditArticle />} />
            <Route path="publish" element={<PubArticle />}>
              <Route path=":id" element={<PubArticle />} />
            </Route>
          </Route>
          <Route path="/" element={<Redirect to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
