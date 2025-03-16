import React, { useState } from 'react';

function Footer() {
  const [darkMode, setDarkMode] = useState(false);

  const isDarkMode = () => {
    return document.documentElement.classList.contains('dark');
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setDarkMode(isDarkMode());
  };
  return (
    <footer>
      <div className='fixed bottom-2 right-2 m-1'>
        <button onClick={toggleTheme} className="p-2 text-sm cursor-pointer bg-black dark:bg-white text-white dark:text-black rounded-full">
          {darkMode ? 'Light' : 'Dark'}
        </button>
      </div>
      <p className='p-3 pt-8'>&copy; Getfilx - 2025 Yu Song.</p>
    </footer>

  );
}

export default Footer;