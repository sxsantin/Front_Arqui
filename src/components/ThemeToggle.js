    import React, { useEffect, useState } from 'react';

    export default function ThemeToggle() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    };

    const applyTheme = (themeToApply) => {
        const body = document.body;
        if (themeToApply === 'dark') {
        body.classList.add('dark');
        body.classList.remove('bg-light');
        } else {
        body.classList.remove('dark');
        body.classList.add('bg-light');
        }
        localStorage.setItem('theme', themeToApply);
        setTheme(themeToApply);
    };

    return (
        <button
        id="theme-toggle"
        onClick={toggleTheme}
        className={`btn position-fixed top-0 end-0 m-3 rounded-circle shadow ${theme === 'dark' ? 'rotate' : ''}`}
        aria-label="Cambiar tema"
        title="Cambiar tema"
        >
        <i
            className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}
            style={{ fontSize: '1.25rem', transition: 'color 0.3s ease' }}
        ></i>
        </button>
    );
    }
