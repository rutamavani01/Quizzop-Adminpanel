import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPages, updatePage } from '../Conf/Api';

const EditPages = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [page, setPage] = useState('');
    const [path, setPath] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pageData = await fetchPages(id);
                setPage(pageData.pagename);
                setPath(pageData.path);
                setDescription(pageData.description);
            } catch (error) {
                console.error('Error fetching page:', error);
            }
        };
        fetchData();
    }, [id]);

    const handlePageChange = (e) => {
        const inputPage = e.target.value;
        setPage(inputPage);

        // Dynamically update the path based on the page name
        const generatedPath = inputPage.trim().toLowerCase().replace(/\s+/g, '-');
        setPath(generatedPath);
    };

    const handleSubmit = async () => {
        const pageData = { pagename: page, path, description };
        try {
            const response = await updatePage(id, pageData);
            alert('Page updated successfully!');
            navigate('/pages');
        } catch (error) {
            console.error('Error updating page:', error);
            alert('Failed to update page. Please try again.');
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
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPages;
