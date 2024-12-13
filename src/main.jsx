import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import AddTag from './Components/AddTag/AddTag.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Tags from './Components/AddTag/Tags.jsx';

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <Navbar />
     <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Add-tag" element={<AddTag />} />
      <Route path="/Tags" element={<Tags />} />
    </Routes>
    
  </BrowserRouter>
)
