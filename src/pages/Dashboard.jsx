import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LuArrowLeftToLine , LuArrowRightToLine} from "react-icons/lu";
import dashboardLinks from '../data/dashboardLinks';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [currentPath , setCurrentPath] = useState(window.location.pathname);
  const location = useLocation();
  const [currentPath , setCurrentPath] = useState(location.pathname);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  


  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`fixed md:static h-full md:h-auto top-0 left-0  w-64 bg-white border-r shadow-md transition-transform duration-300 z-10 md:animate-slideLeft
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex justify-between items-center p-4 md:hidden">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={toggleSidebar}>
            <LuArrowLeftToLine size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-4 p-4 mt-4">
          {dashboardLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
        
              className={`
                ${location.pathname === "/dashboard/" +link.path ? ('bg-gradient-to-r from-green-300 to-teal-400') : 'hover:bg-secondary'}
                  px-4 py-2 rounded transition-all`
              }
              onClick={() => {
                setIsOpen(false);
                setCurrentPath(location.pathname)
              }}
              
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden mb-4 absolute z-auto left-2">
          <button onClick={toggleSidebar} className="text-gray-800">
            <LuArrowRightToLine size={40} />
          </button>
        </div>
        
      {/* Main Content */}
      <div className="w-full md:w-[calc(100vw - 16rem)]">        
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
