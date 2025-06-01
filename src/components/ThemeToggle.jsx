import React, { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 aspect-square w-10 h-10 flex justify-center items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300 ease-in-out text-gray-800 dark:text-yellow-300 hover:scale-110 shadow-md"
      aria-label="Toggle Theme"
    >
      <span className="text-xl transition-transform duration-300">
        {theme === 'light' ? <FiMoon /> : <FiSun />}
      </span>
    </button>
  );
};

export default ThemeToggle;
