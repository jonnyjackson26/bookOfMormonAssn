import React, { useState, useEffect, useContext } from 'react';
import './NavBar.css'
import Path from './Path';
import books from '../books';
import myData from "../../languages/_languages.js"

import { Context } from "../main";

async function logout() {
    const res = await fetch("/registration/logout/", {
        credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
        // navigate away from the single page app!
        window.location = "/registration/sign_in/";
    } else {
        // handle logout failed!
    }
}

const NavBar = ({ book, chapter }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const openDropdown = () => {
        setIsDropdownOpen(true);
    };
    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const [language, setLanguage] = useContext(Context);

    const handleLanguageChange = async (lang) => {
        setLanguage(lang);
    }

    return (
        <nav className="navbar">
            <div className="brand">
                <a href="#"><img src="public/bomLogo.png" alt="BOM.COM" className='icon'></img></a>
            </div>

            <Path book={book} chapter={chapter} />

            <div className="dropdown" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
                <button className="dropbtn">
                    <img src="public/language.png" alt="languages" className='icon'></img>
                </button>

                {isDropdownOpen && (
                    <div className="dropdown-content">
                        {Object.keys(myData).map((langKey) => (
                            <button key={langKey} onClick={() => handleLanguageChange(langKey)}>
                                {myData[langKey][langKey]} / {myData[language][langKey]}
                                {/* will show all of the languages in the dropdown menu */}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <ul className="nav-links">
                <ul className="nav-links">
                    <button onClick={logout}>Logout</button>
                    <li><img src="public/account.png" alt="account" className='icon'></img></li>
                    <li><img src="public/menu.png" alt="menu" className='icon'></img></li>
                </ul>

            </ul>
        </nav>
    );
};

export default NavBar;
