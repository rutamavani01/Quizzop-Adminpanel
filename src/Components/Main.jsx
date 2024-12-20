import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Main = () => {
  return (
    <div className="vh-100 d-flex flex-column">
      <div className="flex-grow-1 d-flex">
        {/* Sidebar */}
        <div
          className="col-2"
          style={{
            backgroundColor: '#191a32',
            height: '100%',
            overflowY: 'auto',
            maxHeight: '100vh',
            position: 'sticky',
            top: 0,
          }}
        >
          <Sidebar />
          <style>
            {`
              /* Webkit browsers (Chrome, Safari) */
              div::-webkit-scrollbar {
                width: 2px;
              }

              div::-webkit-scrollbar-track {
                background: #191a32;
              }

              div::-webkit-scrollbar-thumb {
                background: #6063af;
                border-radius: 1px;
              }

              /* Firefox */
              * {
                scrollbar-width: thin;
                scrollbar-color: #6063af #191a32;
              }
            `}
          </style>
        </div>

        {/* Main Content */}
        <div className="col-10 d-flex flex-column">
          <Header />
          <main
            className="flex-grow-1"
            style={{
              overflowY: 'auto',
              height: 'calc(100vh - 130px)',
            }}
          >
            <Outlet />
            <style>
              {`
                /* Webkit browsers (Chrome, Safari) */
                main::-webkit-scrollbar {
                  width: 2px;
                  }
                  
                  main::-webkit-scrollbar-track {
                    background: #191a32;
                    }
                    
                    main::-webkit-scrollbar-thumb {
                      background: #6063af;
                      border-radius: 1px;
                      }
                      
                      /* Firefox */
                      main {
                        scrollbar-width: thin;
                        scrollbar-color: #6063af #191a32;
                        }
                        `}
            </style>
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Main;