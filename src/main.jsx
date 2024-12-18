import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'

import Navbar from './Components/Navbar/Navbar.jsx';
import Tags from './Components/BlogTag/Tags.jsx';
import AddBlogPost from './Components/BlogPost/AddBlogPost.jsx';
import AllBlogPost from './Components/BlogPost/AllBlogPost.jsx';

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <Navbar />
     <Routes>
      <Route path="/" element={<App />} />
      <Route path="/adminFunctionality/Tags" element={<Tags />} />
      <Route path="/adminFunctionality/AddBlogPost" element={<AddBlogPost/>} />
      <Route path="/adminFunctionality/AllBlogPosts" element={<AllBlogPost/>} />
      
    </Routes>
    
  </BrowserRouter>
)
