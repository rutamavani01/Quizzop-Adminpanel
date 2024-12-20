import React, { useState } from 'react';

const Sidebar = () => {
    const [openMenus, setOpenMenus] = useState({
        email: false,
        uiElements: false,
        forms: false,
        charts: false,
        tables: false,
        icons: false,
        maps: false
    });

    const toggleMenu = (menu) => {
        setOpenMenus(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    return (
        <div className="sidebar text-light">
            <div className="mb-4">
                <img src="./images/quizzop-logo-dark.svg" alt="quizzop logo" className="img-fluid w-50" />
            </div>

            <nav className="nav flex-column">
                <div className="mb-3">
                    <span className="text-secondary small">MAIN</span>
                </div>

                <a href="/" className="nav-link text-light d-flex align-items-center">
                    <i className="bi bi-house-door me-2"></i>
                    Dashboard
                </a>

                <a href="#" className="nav-link text-light d-flex align-items-center">
                    <i className="bi bi-calendar me-2"></i>
                    Calendar
                </a>

                <div className="nav-item">
                    <a
                        href="#"
                        className="nav-link text-light d-flex align-items-center justify-content-between"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleMenu('email');
                        }}
                    >
                        <div>
                            <i className="bi bi-envelope me-2"></i>
                            Email
                        </div>
                        <i className={`bi bi-chevron-${openMenus.email ? 'down' : 'right'} ms-2`}></i>
                    </a>
                    <div className={`ms-3 ${openMenus.email ? 'show' : 'd-none'}`}>
                        <a href="#" className="nav-link text-secondary">Inbox</a>
                        <a href="#" className="nav-link text-secondary">Read Email</a>
                        <a href="#" className="nav-link text-secondary">Compose</a>
                    </div>
                </div>

                <div className="mb-3 mt-4">
                    <span className="text-secondary small">COMPONENTS</span>
                </div>

                <div className="nav-item">
                    <a
                        href="#"
                        className="nav-link text-light d-flex align-items-center justify-content-between"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleMenu('uiElements');
                        }}
                    >
                        <div>
                            <i className="bi bi-box me-2"></i>
                            Category
                        </div>
                        <i className={`bi bi-chevron-${openMenus.uiElements ? 'down' : 'right'} ms-2`}></i>
                    </a>
                    <div className={`ms-3 ${openMenus.uiElements ? 'show' : 'd-none'}`}>
                        <a href="/category" className="nav-link text-secondary">Category</a>
                        <a href="#" className="nav-link text-secondary">Buttons</a>
                        <a href="#" className="nav-link text-secondary">Cards</a>
                    </div>
                </div>

                <div className="nav-item">
                    <a
                        href="#"
                        className="nav-link text-light d-flex align-items-center justify-content-between"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleMenu('forms');
                        }}
                    >
                        <div>
                            <i className="bi bi-file-text me-2"></i>
                            Forms
                        </div>
                        <div>
                            <span className="badge bg-info rounded-pill me-2">9</span>
                            <i className={`bi bi-chevron-${openMenus.forms ? 'down' : 'right'}`}></i>
                        </div>
                    </a>
                    <div className={`ms-3 ${openMenus.forms ? 'show' : 'd-none'}`}>
                        <a href="#" className="nav-link text-secondary">Form Elements</a>
                        <a href="#" className="nav-link text-secondary">Form Validation</a>
                        <a href="#" className="nav-link text-secondary">Form Advanced</a>
                        <a href="#" className="nav-link text-secondary">Form Editors</a>
                        <a href="#" className="nav-link text-secondary">Form Upload</a>
                        <a href="#" className="nav-link text-secondary">Form Repeater</a>
                        <a href="#" className="nav-link text-secondary">Form Wizard</a>
                        <a href="#" className="nav-link text-secondary">Form Mask</a>
                    </div>
                </div>

                <div className="nav-item">
                    <a
                        href="#"
                        className="nav-link text-light d-flex align-items-center justify-content-between"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleMenu('charts');
                        }}
                    >
                        <div>
                            <i className="bi bi-graph-up me-2"></i>
                            Charts
                        </div>
                        <i className={`bi bi-chevron-${openMenus.charts ? 'down' : 'right'} ms-2`}></i>
                    </a>
                    <div className={`ms-3 ${openMenus.charts ? 'show' : 'd-none'}`}>
                        <a href="#" className="nav-link text-secondary">Line Charts</a>
                        <a href="#" className="nav-link text-secondary">Bar Charts</a>
                        <a href="#" className="nav-link text-secondary">Area Charts</a>
                    </div>
                </div>

                <a href="#" className="nav-link text-light d-flex align-items-center">
                    <i className="bi bi-table me-2"></i>
                    Tables
                </a>

                <a href="#" className="nav-link text-light d-flex align-items-center">
                    <i className="bi bi-emoji-smile me-2"></i>
                    Icons
                </a>

                <a href="#" className="nav-link text-light d-flex align-items-center">
                    <i className="bi bi-geo-alt me-2"></i>
                    Maps
                </a>
            </nav>
        </div>
    );
};

export default Sidebar;