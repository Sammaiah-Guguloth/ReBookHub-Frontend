import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import LogoLight from './LogoLight';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import SearchBox from './SearchBox';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    const result = await dispatch(logOutUser());

    if (result.type === "/auth/logOutUser/fulfilled") {
      toast.success('Logged out successfully');
      navigate("/login");
    } else if (result.type === "/auth/logOutUser/rejected") {
      toast.error(result.payload || "Logout failed");
    }
  };

  return (
    <nav className="w-full h-[72px] md:h-16 content-center font-sans border-b-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
      <div className="mx-auto max-w-site flex justify-between items-center px-2 md:px-8">
        {/* Logo */}
        <LogoLight />

        <div className="flex md:gap-5 gap-2   items-center">
          {/* Search Box */}
          <SearchBox />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 items-center animate-slideRight">
            <div className="bg-secondary dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md hover:scale-105 transition-all shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600">
              <Link to="/about">How it Works</Link>
            </div>

            {!isLoggedIn && !isAuthPage && (
              <>
                <div className="bg-secondary dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md hover:scale-105 transition-all shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                  <Link to="/login">Login</Link>
                </div>
                <div className="bg-secondary dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md hover:scale-105 transition-all shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                  <Link to="/signup">Sign Up</Link>
                </div>
              </>
            )}

            {isLoggedIn && (
              <>
                <div className="bg-secondary dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md hover:scale-105 transition-all shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                  <Link to="/dashboard">Dashboard</Link>
                </div>
                <div className="bg-secondary dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md hover:scale-105 transition-all shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                  <button onClick={logOutHandler}>Logout</button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 dark:text-white focus:outline-none"
            >
              {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="md:hidden z-[60] bg-white dark:bg-gray-900 shadow-md border-t-2 border-gray-200 dark:border-gray-700 absolute w-full left-0 top-[72px] transition-all">
          <div className="flex flex-col items-center py-4 gap-4">
            <Link
              to="/about"
              className="text-gray-800 dark:text-white font-medium"
              onClick={() => setMenuOpen(false)}
            >
              How it Works
            </Link>

            {!isLoggedIn && !isAuthPage && (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 dark:text-white font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-800 dark:text-white font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-800 dark:text-white font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logOutHandler();
                    setMenuOpen(false);
                  }}
                  className="text-gray-800 dark:text-white font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
