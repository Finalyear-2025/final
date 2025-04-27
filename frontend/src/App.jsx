import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UploadForm from "./components/UploadForm";
import ShowResult from "./components/Show";
import ChartViewer from "./components/chart";
import Mapread from "./components/map";
function App() {
  return (
    <Router>
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
