import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPageAllData, deletePage } from '../Conf/Api'; 

const ViewPages = () => {
    const [pageNames, setPageNames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPageNames = async () => {
            try {
                const response = await getPageAllData();
                console.log(response);
                setPageNames(response);
            } catch (error) {
                console.error('Error fetching page names:', error);
            }
        };
        fetchPageNames();
    }, []);

    const handleDelete = async (id) => {
            try {
                const response = await deletePage(id); 
                console.log(response);
                alert('Page deleted successfully!');
                setPageNames(prevState => prevState.filter(page => page.id !== id)); 
            } catch (error) {
                console.error('Error deleting page:', error);
                alert('Failed to delete the page. Please try again.');
            }
    };

    return (
        <div
            className="col-12 p-3"
            style={{
                backgroundColor: '#191a32',
                color: 'white',
                width: '100%',
                borderRadius: '5px',
            }}>
            {pageNames.length > 0 ? (
                pageNames.map((pageName, index) => (
                    <div
                        key={index}
                        className="d-flex flex-wrap justify-content-between align-items-center col-12 p-2 mb-2"
                        style={{
                            backgroundColor: '#202240',
                            borderRadius: '5px',
                            padding: '10px',
                        }}>
                        <div>
                            <h6 className="ms-2 p-0">{pageName.pagename}</h6> 
                        </div>
                        <div>
                            <td
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    padding: '10px',
                                }}>
                                <Link to={`/edit-pages/${pageName.id}`} className="text-success me-3 fs-5">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <button
                                    onClick={() => handleDelete(pageName.id)}  
                                    className="text-danger fs-5"
                                    style={{
                                        border: 'none',
                                        background: 'transparent',
                                    }}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </div>
                    </div>
                ))
            ) : (
                <h6>Loading...</h6>
            )}
        </div>
    );
};

export default ViewPages;
