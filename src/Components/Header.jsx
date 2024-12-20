import React from 'react';
import Sidebar from './Sidebar';
import { FaBell, FaCog, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="d-flex" style={{ backgroundColor: '#191a32', color: 'white' }}>
      {/* <Sidebar /> */}
      <div className="col-12 p-2">
        <nav className="navbar navbar-expand-lg px-4 py-2">
          <div className="container-fluid d-flex align-items-center">
            {/* Toggle Sidebar Button */}
            {/* <button className="btn text-white me-3">
              <span className="navbar-toggler-icon" />
            </button> */}
            {/* Create Dropdown */}
            {/* <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle text-white"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Create
              </button>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton">
                <li>
                  <a className="dropdown-item" href="#">
                    New Project
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    New Task
                  </a>
                </li>
              </ul>
            </div> */}
            {/* Search Bar */}
            <form className="d-flex ms-4 flex-grow-1 justify-content-start">
              <input
                className="form-control text-white  "
                style={{ backgroundColor: '#2C2F48', border: 'none', width: '50%' }}
                type="search"
                placeholder="Search..."
                aria-label="Search" placeholderStyle={{ color: 'white' }}
              />
              <button className="btn text-white" type="submit">
                <i className="bi bi-search text-white" />
              </button>
            </form>
            {/* Right-side Icons */}
            <div className="d-flex align-items-center ms-auto">

              {/* Notification Icon */}
              <button className="btn text-white position-relative me-3">
                <FaBell />
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                >
                  3
                </span>
              </button>

              {/* Settings */}
              {/* <button className="btn text-white">
                <FaCog size={20} />
              </button> */}

              {/* User Profile */}
              <button className="btn text-white me-3">
                <FaUserCircle size={24} />
              </button>

              <div className="dropdown">
                <button
                  className="btn dropdown-toggle text-white"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaCog size={20} />
                </button>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                  <li>
                    <a className="dropdown-item" href="#">
                      New Project
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      New Task
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
