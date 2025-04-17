import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UploadForm from "./components/UploadForm";
import ShowResult from "./components/Show";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/Show" element={<ShowResult />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<UploadForm />} />
      </Routes>
    </Router>
  );
}

export default App;
