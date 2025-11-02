import React from "react";

const  Navbar =()=>{
    return(
<div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
   
    <a className="btn btn-ghost text-xl">TravelEase</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Home</a></li>
      <li><a>Destination</a></li>
     
    </ul>
  </div>
  <div className="navbar-end">
     <a className="btn">Login</a>
  </div>
</div>
    );
};

export default Navbar;
