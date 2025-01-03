import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRules, updateRules } from '../Conf/Api';

const EditRules = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [rules, setRules] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRules = async () => {
            try {
                const data = await fetchRules(id);
                setLoading(false);
                console.log('Fetched Rules:', data);

                if (data && data.rules) {
                    // Assuming rules is returned as a string, so no need to split
                    setRules(data.rules);
                } else {
                    setRules('');
                }
            } catch (error) {
                setLoading(false);
                console.error('Error loading rules:', error);
            }
        };

        if (id) {
            loadRules();
        }
    }, [id]);

    const handleSave = async () => {
        try {
            // Update the rules (the textarea is now a single value, not an array)
            const updatedRulesData = { rules };
            await updateRules(id, updatedRulesData);
            alert('Rules updated successfully!');
            navigate('/rules');
        } catch (error) {
            alert('Error updating rules');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='p-4'>
            <h5 className='text-white'>Edit Rules</h5>
            <div className='col-12 px-4 py-2' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
                {rules === '' ? (
                    <div>No rules found to edit</div>
                ) : (
                    <div className="mb-3 text-white">
                        <textarea
                            value={rules} rows={20}
                            className="form-control d-inline"
                            style={{
                                border: '1px solid #6063af',
                                backgroundColor: 'transparent',
                                borderRadius: '5px',
                                width: '95%',
                                fontSize: '15px',
                                color: 'white',
                            }}
                            onChange={(e) => setRules(e.target.value)}
                        />
                    </div>
                )}
                <button
                    type="button"
                    style={{ backgroundColor: '#404380' }}
                    className="btn text-white px-5 mt-2"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditRules;
