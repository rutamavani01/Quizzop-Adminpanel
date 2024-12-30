import React, { useState } from 'react';
import { addRules } from '../Conf/Api'; 
import ViewRules from './ViewRules';

const Rules = () => {
    const [rules, setRules] = useState([{ rules: "" }]);

    const handleAddRule = () => {
        setRules([...rules, { rules: "" }]); 
    };

    const handleInputChange = (index, value) => {
        const updatedRules = [...rules];
        updatedRules[index].rules = value; 
        setRules(updatedRules);
    };

    const handleSubmit = async () => {
        try {
            await addRules(rules);
            alert("Rules submitted successfully!");
        } catch (error) {
            console.error('Error submitting rules:', error);
            alert('Error submitting rules');
        }
    };

    return (
        <div className='p-4'>
            <h5 className="text-white mb-3">Setting Add</h5>
            <div className='col-12 d-flex flex-wrap px-4 py-2' style={{ backgroundColor: 'transparent', color: 'white', width: '100%', borderRadius: '5px' }}>
                <div className='col-12 px-4 py-2' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
                    <p className='mb-2' style={{ fontSize: '17px' }}>Rules</p>

                    {/* Dynamic list of rules */}
                    {rules.map((rule, index) => (
                        <div key={index} className="mb-3">
                            <input
                                className="form-control d-inline"
                                type="text"
                                value={rule.rules}
                                onChange={(e) => handleInputChange(index, e.target.value)}
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
                    ))}

                    {/* Add New Rule Button */}
                    <span>
                        <button
                            type="button"
                            onClick={handleAddRule}
                            style={{
                                backgroundColor: '#404380',
                                color: 'white',
                                border: 'none',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            +
                        </button>
                    </span>

                    {/* Submit Button */}
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
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <ViewRules />
        </div>
    );
};

export default Rules;
