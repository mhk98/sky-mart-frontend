// import React from "react";
// import "./Header.css";

// import { Link, useNavigate } from "react-router-dom";
// const Header = () => {
//   const token = localStorage.getItem("token");
//   const image = localStorage.getItem("image");
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.clear();
//     navigate("/login");
//     window.location.reload();
//   };
//   return (
//     <div className="navbar bg-base-100">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
//           >
//             <li>
//               <a>Item 1</a>
//             </li>
//             <li>
//               <a>Parent</a>
//               <ul className="p-2">
//                 <li>
//                   <a>Submenu 1</a>
//                 </li>
//                 <li>
//                   <a>Submenu 2</a>
//                 </li>
//               </ul>
//             </li>
//             <li>
//               <a>Item 3</a>
//             </li>
//           </ul>
//         </div>
//         <a className="btn btn-ghost text-xl">daisyUI</a>
//       </div>
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           <li>
//             <a>Item 1</a>
//           </li>
//           <li>
//             <details>
//               <summary>Parent</summary>
//               <ul className="p-2">
//                 <li>
//                   <a>Submenu 1</a>
//                 </li>
//                 <li>
//                   <a>Submenu 2</a>
//                 </li>
//               </ul>
//             </details>
//           </li>
//           <li>
//             <a>Item 3</a>
//           </li>
//         </ul>
//       </div>
//       <div className="navbar-end">
//         <ul>
//           {token ? (
//             <li>
//               <Link onClick={handleLogout}>Logout</Link>
//             </li>
//           ) : (
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useGetAllCartQuery } from "../../features/cart/cart";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const { data, isLoading, isError, error } = useGetAllCartQuery();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (isError) {
      // Handle error, you can log it or display an error message.
      console.error("Error fetching cart data:", error);
    } else if (!isLoading) {
      // Only set the cart if there is data and it's not already set to avoid infinite re-renders.
      if (data && data.data) {
        setCart(data.data);
      }
    }
  }, [data, isLoading, isError, error]);
  return (
    <div style={{ backgroundColor: "#1F2227", padding: "10px 0px" }}>
      <Navbar collapseOnSelect expand="lg" className="container">
        {/* <Container> */}
        <Navbar.Brand className="text-white" href="#home">
          Logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Link
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "600",
                marginRight: "30px", // Add right margin here

                textDecoration: "none",
              }}
              to="/"
            >
              Home
            </Link>
            <Link
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "600",
                marginRight: "30px", // Add right margin here

                textDecoration: "none",
              }}
              to="/"
            >
              Product
            </Link>
            <Link
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "600",
                marginRight: "30px", // Add right margin here
                textDecoration: "none",
              }}
              to="/about"
            >
              About
            </Link>
            <Link
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "600",
                marginRight: "30px", // Add right margin here

                textDecoration: "none",
              }}
              to="/privacy"
            >
              Privacy
            </Link>
            <Link
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "600",
                marginRight: "30px", // Add right margin here

                textDecoration: "none",
              }}
              to="/contact"
            >
              Conact Us
            </Link>
          </Nav>

          <Nav style={{ display: "flex", alignItems: "center", gap: "35px" }}>
            {cart.length > 0 && (
              <div className="addtocart">
                <Link to="/cart" className="icon ml-30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.8em"
                    viewBox="0 0 576 512"
                    fill="white"
                  >
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c-2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                  </svg>
                </Link>
                <p className=" notification">{cart?.length}</p>
              </div>
            )}
            {token ? (
              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 25px",
                  fontSize: "20px",
                  fontWeight: "600",
                  backgroundColor: "#FFA114",
                  color: "white",
                }}
              >
                LogOut
              </button>
            ) : (
              <button
                style={{
                  padding: "8px 25px",
                  fontSize: "20px",
                  fontWeight: "600",
                  backgroundColor: "#FFA114",
                  color: "white",
                }}
              >
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/login"
                >
                  {" "}
                  Sign In
                </Link>
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </div>
  );
};

export default Header;
