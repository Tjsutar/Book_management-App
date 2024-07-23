import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 ">
      <ul className="flex justify-center">
        <li className="mr-6">
          <Link to="/" className="text-white text-xl-bold hover:text-gray-200">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/add"
            className="text-white hover:text-gray-200 "
          >
            Add Book
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
