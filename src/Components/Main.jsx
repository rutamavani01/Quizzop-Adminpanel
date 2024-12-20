import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Main = () => {
    return (
        <div className="d-flex flex-column" >
            <div className="d-flex flex-grow-1">
                <div className="col-2 min-vh-100 text-light p-3" style={{ backgroundColor: '#191a32', color: 'white' }}>
                    <Sidebar />
                </div>
                <div className="col-10 d-flex flex-column">
                    <Header />
                    <div className="flex-grow-1 overflow-auto">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Main;
