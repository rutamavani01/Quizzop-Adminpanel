import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPageAllData } from '../Conf/Api';

const ViewPageAlldata = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const response = await getPageAllData(id); // Pass ID to the API
                setPageData(response);
            } catch (error) {
                console.error('Error fetching page data:', error);
            }
        };

        fetchPageData();
    }, [id]);

    return (
        <div className="p-4">
            <div
                className="col-12 p-4 mb-4"
                style={{
                    backgroundColor: '#191a32',
                    color: 'white',
                    width: '100%',
                    borderRadius: '5px',
                }}
            >
                {pageData ? (
                    <div>
                        <h5>{pageData.pagename}</h5>
                        <p>{pageData.description}</p>
                        <small>Path: {pageData.path}</small>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default ViewPageAlldata;
