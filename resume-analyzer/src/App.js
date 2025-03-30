import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ResumeScan from './components/Scan/ResumeScan';
import Nav from './components/Nav/Nav';
import ResumewithJD from './components/JDScan/ResumewithJD';
import Home from './components/Home/Home';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<ResumeScan />} />
        <Route path="/scan-using-jd" element={<ResumewithJD />} />
      </Routes>
    </Router>
  );
}

export default App;
