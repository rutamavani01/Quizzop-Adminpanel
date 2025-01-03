import React, { useEffect, useState } from 'react';
import { getRules, deleteRules } from '../Conf/Api';
import { Link } from 'react-router-dom';

const ViewRules = ({ refreshRules }) => {
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRules();
    }, [refreshRules]);

    const fetchRules = async () => {
        try {
            setLoading(true);
            const response = await getRules();
            setRules(response.data.Data);
        } catch (error) {
            console.error("Error fetching rules:", error);
            setError("Failed to load rules");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            // Delete the rule via the deleteRules API function
            await deleteRules(id);
            // Remove the deleted rule from the state (UI update)
            setRules((prevRules) => prevRules.filter(rule => rule.id !== id));
            alert('Rule deleted successfully!');
        } catch (error) {
            alert('Error deleting rule');
        }
    };

    if (loading) {
        return (
            <div className='col-12 px-4 py-2' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
                <h4>Loading rules...</h4>
            </div>
        );
    }

    if (error) {
        return (
            <div className='col-12 px-4 py-2' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
                <h4>Error: {error}</h4>
            </div>
        );
    }

    return (
        <div className='col-12 d-flex flex-wrap px-4 py-2' style={{ backgroundColor: 'transparent', color: 'white', width: '100%', borderRadius: '5px' }}>
            <div className='col-12 p-3' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
                {rules.length === 0 && (
                    <div className="text-center py-4">
                        <p>No rules found</p>
                    </div>
                )}

                {rules.map((ruleSet) => (
                    <div key={ruleSet.id} className="mb-4 p-3">
                        <div className="rules-container">
                            <div
                                className="mb-2 p-2"
                                style={{
                                    backgroundColor: '#191a32',
                                    borderRadius: '3px',
                                    marginBottom: '10px',
                                }}
                            >
                                <p className="mb-0" style={{ color: '#8789c3' }}>
                                    {/* Convert newlines to <br /> */}
                                    {ruleSet.rules.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </p>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mt-3">
                            <Link to={`/edit-rules/${ruleSet.id}`} state={{ id: ruleSet.id }} className="btn btn-primary">Edit</Link>
                            {/* <button className="btn btn-danger" onClick={() => handleDelete(ruleSet.id)}>
                                Delete
                            </button> */}
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewRules;
