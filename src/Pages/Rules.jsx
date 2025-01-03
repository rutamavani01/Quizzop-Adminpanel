import React, { useState } from 'react';
import { addRules } from '../Conf/Api';
import ViewRules from './ViewRules';

const Rules = () => {
    const [rule, setRule] = useState("");  // State to hold the single rule input
    const [loading, setLoading] = useState(false);  // Loading state for submit action
    const [error, setError] = useState("");  // Error state for error messages

    // Handle form submission
    const handleSubmit = async () => {
        if (!rule.trim()) {
            setError("Rule cannot be empty.");
            return;
        }

        setLoading(true);
        try {
            // Call the addRules API with the rule data
            const result = await addRules(rule);
            console.log(result);
            setRule(""); // Reset input after successful submit
            setError(""); // Reset error message
        } catch (err) {
            setError("Failed to add the rule. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4'>
            <h5 className="text-white mb-3">Rules </h5>
            <div className='col-12 d-flex flex-wrap px-4 py-2' style={{ backgroundColor: 'transparent', color: 'white', width: '100%', borderRadius: '5px' }}>
                {/* <div className='col-12 px-4 py-2' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
                    <p className='mb-2' style={{ fontSize: '17px' }}>Rules</p>
                    <div className="mb-3">
                        <input
                            className="form-control d-inline"
                            type="text"
                            value={rule} 
                            onChange={(e) => setRule(e.target.value)}  
                            style={{
                                border: '1px solid #6063af',
                                backgroundColor: 'transparent',
                                borderRadius: '5px',
                                width: '95%',
                                fontSize: '15px',
                                color: 'white',
                            }}
                        />
                    </div>

                    {error && <p className="text-danger">{error}</p>}

                    <div className="mt-4">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            style={{
                                backgroundColor: '#404380',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div> */}
            </div>
            <ViewRules />
        </div>
    );
};

export default Rules;
