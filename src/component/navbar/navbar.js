import { useContext, useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.webp";

import { AuthContext } from '../../context/AuthProvider';
import $ from 'jquery';

import "./navbar.css";

function Navbar() {
    const { omowillAuth, setCookie } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const [authFlg, setAuthFlg] = useState(omowillAuth.isAuth);

    const [scrolled, setScrolled] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleClickOutside = (event) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        setAuthFlg(omowillAuth.isAuth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            
        };

        const updateClasses = () => {
            if (window.innerWidth > 1200) {
                document.querySelectorAll(".nav-link-btn1").forEach(el => el.classList.add('nav-pr-0'));
                document.querySelectorAll(".nav-link-btn2").forEach(el => el.classList.add('nav-ps-0'));
            } else {
                document.querySelectorAll(".nav-link-btn1").forEach(el => el.classList.remove('nav-pr-0'));
                document.querySelectorAll(".nav-link-btn2").forEach(el => el.classList.remove('nav-ps-0'));
            }
        };

        updateClasses();

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);

            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [omowillAuth.isAuth, windowWidth]);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > window.previousScrollY) {
            setScrolled(true);
            setIsOpen(false);
        } else if (currentScrollY < window.previousScrollY) {
            setScrolled(false);
        }

        window.previousScrollY = currentScrollY;
    };

    const logout = () => {
        omowillAuth.isAuth = false;
        setAuthFlg(omowillAuth.isAuth);
        setCookie(omowillAuth);
    }

    const handleMobileMenu = () => {
        setIsOpen(!isOpen);
        setScrolled(false);
        $(".nav-link-btn1").removeClass('nav-pr-0');
        $(".nav-link-btn2").removeClass('nav-ps-0');
    }

    const handleBgStyle = {
        backgroundColor: scrolled ? 'transparent' : 'white',
        boxShadow: scrolled ? 'none' : 'rgb(200 206 216 / 10%) 0px 15px 15px -10px',
        transition: 'background-color 0.5s ease' // Add transition for smooth background color change
    };

    const mobileHandleBgstyle = {
        backgroundColor: 'white',
        transition: 'background-color 0.5s ease', // Add transition for smooth background color change
        boxShadow: 'rgba(33, 35, 38, 0.1) 0px 15px 15px -10px',
        borderRadius: '0px 0px 10px 10px',
        borderBottom: '1px solid rgb(229, 229, 229)',
        paddingBottom: '0px',
        paddingInline: '10px'
    }

    const chandleBgStyle = {
        backgroundColor: 'transparent',
        transition: 'background-color 0.5s ease' // Add transition for smooth background color change
    };

    const cmobileHandleBgstyle = {
        backgroundColor: 'rgb(229, 229, 229)',
        transition: 'background-color 0.5s ease', // Add transition for smooth background color change
        boxShadow: 'rgba(33, 35, 38, 0.1) 0px 15px 15px -10px',
        borderRadius: '0px 0px 10px 10px',
        borderBottom: '1px solid rgb(229, 229, 229)',
        margin: '0px',
        paddingBottom: '28px'
    }

    const headingStyle = {
        opacity: scrolled ? 0 : 1,
        visibility: scrolled ? 'hidden' : 'visible',
        transition: 'opacity 0.5s ease, visibility 0.5s ease' // Add transition for smooth hide/show effect
    };


    return (
        <nav className="navbar navbar-expand-xl fixed-top" style={windowWidth < 1200 && isOpen ? mobileHandleBgstyle: handleBgStyle}>
                <Link className="navbar-brand navbar-response" to="/" style={headingStyle}>
                    <div className="flex-nowrap flex-logo" style={{ alignItems: "center" }}>
                        <img className="p-0 logo" src={logo} alt="img" />
                    </div>
                </Link>
                <button
                    ref={buttonRef}
                    className="navbar-toggler"
                    type="button"
                    onClick={handleMobileMenu}
                >
                    {
                        !isOpen ? (
                            <span className="fa fa-reorder"></span>
                        ):(
                            <span className='fw-bold'>&times;</span>
                        )
                    }
                </button>
                <div
                    className={`collapse navbar-collapse m-2 ${isOpen ? 'show' : ''}`}
                    ref={menuRef}
                    style={windowWidth < 1200 && isOpen ? cmobileHandleBgstyle: chandleBgStyle}
                    >
                    <div className='me-auto'></div>
                    <ul className="navbar-nav">
                        <li className="nav-item" style={headingStyle}>
                            <Link
                                className="nav-link text-dark font-primary"
                                to="/service"
                            >
                                <h6>サービス</h6>
                            </Link>
                        </li>
                        <li className="nav-item" style={headingStyle}>
                            <Link
                                className="nav-link text-dark font-primary"
                                to="/info"
                            >
                                <h6>お知らせ</h6>
                            </Link>
                        </li>
                        <li className="nav-item dropdown" style={headingStyle}>
                            <Link
                                className="nav-link text-dark font-primary"
                                to="/requestFileView"
                            >
                                <h6>動画・PDF閲覧申請</h6>
                            </Link>
                        </li>

                        <li className="nav-item dropdown" style={headingStyle}>
                            <Link
                                className="nav-link text-dark font-primary"
                                to="/pdfOrVideoView"
                            >
                                <h6>動画・PDF閲覧</h6>
                            </Link>
                        </li>

                        {authFlg ? (
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-dark font-primary"
                                    to="/mypage"
                                >
                                    <h6>マイページ</h6>
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item nav-link-button">
                                    <Link className="nav-link nav-link-btn1 nav-pr-0" to="/register">
                                        <button className="btn btn-primary">
                                            <h6>
                                                <i className="fa fa-user-plus"></i>
                                                &nbsp;&nbsp;&nbsp;ご利用登録
                                            </h6>
                                        </button>
                                    </Link>
                                </li>

                                <li className="nav-item nav-link-button">
                                    <Link className="nav-link nav-ps-0 nav-link-btn2" to="/login">
                                        <button className="btn btn-primary">
                                            <h6>
                                                <i className="fa fa-user"></i>
                                                &nbsp;&nbsp;&nbsp;マイページ
                                            </h6>
                                        </button>
                                    </Link>
                                </li>
                            </>
                        )}

                        {
                            authFlg ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        <button className="btn btn-primary" onClick={logout}>
                                            <i className="fa fa-sign-out"></i>
                                            &nbsp;&nbsp;&nbsp;サインアウト
                                        </button>
                                    </Link>
                                </li>
                            ) : (null)
                        }
                    </ul>
                </div>
        </nav>
    );
}

export default Navbar;
