import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineMenu, HiX, HiUserCircle } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <nav className="bg-white p-4 shadow-md sticky top-0 z-50 flex items-center">
      {/* Logo on the Left */}
      <div className="text-xl font-bold">
        <Link to="/home">VERDANT</Link>
      </div>

      {/* Hamburger Button on the Right (Mobile) */}
      <div className="ml-auto md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <HiX size={28} className="cursor-pointer" />
          ) : (
            <HiOutlineMenu size={28} className="cursor-pointer" />
          )}
        </button>
      </div>

      {/* Navigation Links (Hidden in Mobile, Visible in Desktop) */}
      <div
        className={`absolute left-0 top-full w-full bg-green-400 p-4 text-right md:top-0 md:left-1/2 md:-translate-x-1/2 md:w-auto md:bg-transparent md:flex md:items-center md:gap-9 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Link to="/" className="block py-2 md:inline-block"></Link>
        <Link to="/home" className="block py-2 md:inline-block">
          Home
        </Link>
        <Link to="/forum" className="block py-2 md:inline-block">
          Forum
        </Link>
        <Link to="/article" className="block py-2 md:inline-block">
          Articles
        </Link>
        <Link to="/profile" className="block py-2 md:inline-block, md:hidden">
          Profile
        </Link>
      </div>
      {isLandingPage ? (
        <div>
          <Link to="/login">
            <Button label="Sign In" />
          </Link>
          {/*<Link to="/signup">
            <Button label="Sign Up" />
          </Link> */}
        </div>
      ) : (
        <div className="hidden md:block ml-auto  ">
          <Link to="/profile">
            <HiUserCircle
              size={38}
              className="text-gray-700 hover:text-gray-900"
            />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
