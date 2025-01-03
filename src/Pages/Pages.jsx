import React, { useState } from 'react';
import { addPage } from '../Conf/Api';
import ViewPages from './ViewPages';

const Pages = () => {
    const [page, setPage] = useState('');
    const [path, setPath] = useState('');
    const [description, setDescription] = useState('');

    const handlePageChange = (e) => {
        const inputPage = e.target.value;
        setPage(inputPage);

        // Generate path dynamically
        const generatedPath = inputPage.trim().toLowerCase().replace(/\s+/g, '-');
        setPath(generatedPath);
    };

    const handleSubmit = async () => {
        const pageData = { pagename: page, path, description };
        try {
            const response = await addPage(pageData);
            console.log(response);

            setPage('');
            setPath('');
            setDescription('');
            alert('Page added successfully!');
        } catch (error) {
            console.error("Error adding page:", error);
            alert('Failed to add page. Please try again.');
        }
    };

    return (
        <div className="p-4">
            <div
                className="col-12 d-flex flex-wrap justify-content-between p-4 mb-4"
                style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}
            >
                <div className="mb-3 col-6 p-2">
                    <label className="mb-2">Page</label>
                    <input
                        type="text"
                        name="pagename"
                        className="form-control"
                        style={{ backgroundColor: 'transparent', color: 'white' }}
                        value={page}
                        onChange={handlePageChange}
                    />
                </div>

                <div className="mb-3 col-6 p-2">
                    <label className="mb-2">Path</label>
                    <input
                        type="text"
                        name="path"
                        className="form-control"
                        style={{ backgroundColor: 'transparent', color: 'white' }}
                        value={path}
                        readOnly
                    />
                </div>

                <div className="mb-3 col-12 p-2">
                    <label className="mb-2">Description</label>
                    <textarea
                        rows={15}
                        type="text"
                        name="description"
                        className="form-control"
                        style={{ backgroundColor: 'transparent', color: 'white' }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="button"
                        style={{ backgroundColor: '#404380' }}
                        className="btn text-white px-5 waves-effect waves-light text-center d-flex justify-content-start mt-3"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>

            <ViewPages />
        </div>
    );
};

export default Pages;
