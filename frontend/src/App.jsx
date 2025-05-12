import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route,useNavigate  } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UploadForm from "./components/UploadForm";
import ShowResult from "./components/Show";
import ChartViewer from "./components/chart";
import Mapread from "./components/map";

const TokenWatcher = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAndHandleTokenExpiry = () => {
      const expiry = localStorage.getItem("tokenExpiry");
      if (expiry) {
        const expiryTime = parseInt(expiry);
        const now = Date.now();

        if (now >= expiryTime) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiry");
          console.log("Token expired and removed");
          navigate("/login");
        } else {
          const timeLeft = expiryTime - now;
          const timeout = setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiry");
            console.log("Token auto-removed after expiry");
            navigate("/login");
          }, timeLeft);

          return () => clearTimeout(timeout);
        }
      }
    };

    checkAndHandleTokenExpiry();
  }, [navigate]);

  return null;
};

function App() {
  return (
    <Router>
      <TokenWatcher />
      <Header />
      <Routes>
        <Route path="/Show" element={<ShowResult />}/>
        <Route path="/graph" element={<ChartViewer />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<UploadForm />} />
        <Route path="/map" element={<Mapread />} />
      </Routes>
    </Router>
  );
}

export default App;
