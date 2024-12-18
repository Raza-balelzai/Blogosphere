import React from "react";
import { Link } from "react-router";


/*

cont Button = (props) =>{
return  <button
        {...props}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

  }

 */



// <Button onClick={()=>{}} className="navbar-toggler" sx={{}} type="button"   />
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-2 bg-dark">
      <Link className="navbar-brand" to="/">
        Blogosphere
      </Link>
      {/* Button that click will toggle the navbar */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            {/*  */}
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin functionality
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link className="dropdown-item" to={"/adminFunctionality/Tags"}>
                  Admin Tags
                </Link>
                <Link className="dropdown-item" to={"/adminFunctionality/AddBlogPost"}>
                  Add Blog Post
                </Link>
                <Link className="dropdown-item" to={"/adminFunctionality/AllBlogPosts"}>
                  All Blog Posts
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
