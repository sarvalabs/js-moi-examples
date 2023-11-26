import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.svg";
// import { truncateStr } from "../utils/truncate";

const Navbar = ({showMnemonicModal, mnemonic, handleLogout}) => {
    const [toggleValue, setToggle] = useState(false);

    const navRef = useRef(null);

    const theNavLinks = [
        { label: "Built on MOI", link: "https://moi.technology/" }
    ];

    const handleToggle = () => {
        setToggle(!toggleValue);
    };

    const closeNavOnScroll = () => {
        if (toggleValue) {
            setToggle(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", closeNavOnScroll);
        return () => {
            window.removeEventListener("scroll", closeNavOnScroll);
        };
    }, [toggleValue]);

    return (
        <nav className="navbar navbar-container">
            <div className="nav__header">
                <div
                    onClick={handleToggle}
                    className={
                        (toggleValue && "nav__burger nav__burger--close") || "nav__burger"
                    }
                >
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <a href="/" className="">
                    <h2>DReddit</h2>
                </a>
            </div>
            <ul
                ref={navRef}
                className={
                    (toggleValue && "nav__links nav__links--expanded") || "nav__links"
                }
            >
                {theNavLinks.map((link, index) => (
                    <a key={index} href={link.link} target="_blank" rel="noopener noreferrer">
                        {link.label}
                    </a>
                ))}
                <a onClick={!mnemonic ? showMnemonicModal : handleLogout} rel="noopener noreferrer">
                      {!mnemonic ? "Login" : "Logout"}
                </a>
            </ul>
        </nav>
    );
};

export default Navbar;
