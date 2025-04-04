import React, { useEffect, useState } from 'react';
import { Link,  useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import LogoLight from './LogoLight';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';

const NavBar = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const {isLoggedIn , isLoading } = useSelector((state) => state.auth);
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
}

  return (
    <nav className="w-full h-[72px] md:h-16 border-b-2 content-center font-sans bg-white ">
      <div className="mx-auto max-w-site flex justify-between items-center px-4 md:px-8">
        {/* Logo */}
        <LogoLight  />

          <>
            {/* Desktop Links */}
            <div className="hidden transition-all md:flex gap-6 items-center animate-slideRight">

              <div className="bg-secondary px-3 py-2 rounded-md hover:scale-105 transition-all shadow-lg">
                <Link to="/about">How it Works</Link>
              </div>
              
              {
                !isLoggedIn && !isAuthPage && (
                  <>
                      <div className="bg-secondary px-3 py-2 rounded-md hover:scale-105 transition-all shadow-lg">
                      <Link Link to="/login">Login</Link>
                    </div>
                    <div className="bg-secondary px-3 py-2 rounded-md hover:scale-105 transition-all shadow-lg">
                      <Link to="/signup">Sign Up</Link>
                    </div>
                  </>
                )
              }
              {
                isLoggedIn && (
                  <>
                     <div className="bg-secondary px-3 py-2 rounded-md hover:scale-105 transition-all shadow-lg">
                      <Link to="/dashboard">Dashboard</Link>
                    </div>
                    <div 
                      className="bg-secondary px-3 py-2 rounded-md hover:scale-105 transition-all shadow-lg">
                      <button
                          onClick={() => logOutHandler()}
                      >Logout</button>
                    </div>
                  </>
                )
              }
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-800 focus:outline-none"
              >
                {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
              </button>
            </div>
          </>
      </div>

      {/* Mobile Links */}
      { menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t-2 absolute w-full left-0 top-[72px] transition-all">
          <div className="flex flex-col items-center py-4 gap-4">
            <Link 
              to="/about" 
              className="text-gray-800 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              How it Works
            </Link>
            { // login and sign up
              !isAuthPage && !isLoggedIn && (
                <>
                      <Link 
                      to="/login" 
                      className="text-gray-800 font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="text-gray-800 font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign Up
                    </Link>

                </>
              )
            }
            {isLoggedIn && 
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-800 font-medium"
                    onClick={() => setMenuOpen(false)}
                    >
                    Dashboard
                  </Link>

                  <button onClick={() => logOutHandler()}
                    className='text-gray-800 font-medium'
                  >
                    Logout
                  </button> 
                    
                </>
              
            }
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
