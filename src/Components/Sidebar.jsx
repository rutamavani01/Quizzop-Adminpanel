import React, { useState } from 'react';

const Sidebar = () => {
    const [openMenus, setOpenMenus] = useState({
        email: false,
        uiElements: false,
        forms: false,
        rules: false,
        charts: false,
        tables: false,
        icons: false,
        maps: false,
        pages: false
    });

    const toggleMenu = (menu) => {
        setOpenMenus(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    return (
        <div className="sidebar text-light p-3">
            <div className="mb-4 p-3">
                <img src="/images/quizzop-logo-dark.svg" alt="quizzop logo" className="img-fluid w-50" />
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
                            Quiz
                        </div>
                        <div>
                            {/* <span className="badge bg-info rounded-pill me-2">9</span> */}
                            <i className={`bi bi-chevron-${openMenus.forms ? 'down' : 'right'}`}></i>
                        </div>
                    </a>
                    <div className={`ms-3 ${openMenus.forms ? 'show' : 'd-none'}`}>
                        <a href="/quiz" className="nav-link text-secondary">Quiz</a>

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
                            Setting
                        </div>
                        <i className={`bi bi-chevron-${openMenus.charts ? 'down' : 'right'} ms-2`}></i>
                    </a>
                    <div className={`ms-3 ${openMenus.charts ? 'show' : 'd-none'}`}>
                        <a href="/setting" className="nav-link text-secondary">Setting</a>
                        {/* <a href="#" className="nav-link text-secondary">Bar Charts</a>
                        <a href="#" className="nav-link text-secondary">Area Charts</a> */}
                    </div>
                </div>

                <div className="nav-item">
                    <a
                        href="#"
                        className="nav-link text-light d-flex align-items-center justify-content-between"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleMenu('rules');
                        }}
                    >
                        <div>
                            <i className="bi bi-file-text me-2"></i>
                            Rules
                        </div>
                        <div>
                            {/* <span className="badge bg-info rounded-pill me-2">9</span> */}
                            <i className={`bi bi-chevron-${openMenus.rules ? 'down' : 'right'}`}></i>
                        </div>
                    </a>
                    <div className={`ms-3 ${openMenus.rules ? 'show' : 'd-none'}`}>
                        <a href="/rules" className="nav-link text-secondary">Rules</a>

                    </div>
                </div>

                <div className="nav-item">
                    <a
                        href="#"
                        className="nav-link text-light d-flex align-items-center justify-content-between"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleMenu('pages');
                        }}
                    >
                        <div>
                            <i className="bi bi-file-text me-2"></i>
                            Pages
                        </div>
                        <div>
                            {/* <span className="badge bg-info rounded-pill me-2">9</span> */}
                            <i className={`bi bi-chevron-${openMenus.pages ? 'down' : 'right'}`}></i>
                        </div>
                    </a>
                    <div className={`ms-3 ${openMenus.pages ? 'show' : 'd-none'}`}>
                        <a href="/pages" className="nav-link text-secondary">pages</a>

                    </div>
                </div>

                <a href="/notification" className="nav-link text-light d-flex align-items-center">
                    <i class="fa-regular fa-bell me-2"></i>
                    Notification
                </a>

            </nav>
        </div>
    );
};

export default Sidebar;