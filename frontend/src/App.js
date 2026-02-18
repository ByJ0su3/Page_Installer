import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('es');

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLanguage = localStorage.getItem('language') || 'es';
    setTheme(savedTheme);
    setLanguage(savedLanguage);
    
    // Apply theme
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div className="App">
      <LandingPage 
        theme={theme} 
        toggleTheme={toggleTheme}
        language={language}
        changeLanguage={changeLanguage}
      />
    </div>
  );
}
