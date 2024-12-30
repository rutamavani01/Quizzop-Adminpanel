import React, { useEffect, useState } from 'react';
import { getRules } from '../Conf/Api';

const ViewRules = () => {
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRules();
    }, []);

    const fetchRules = async () => {
        try {
            setLoading(true);
            const response = await getRules();
            if (response.data && response.data.Data) {
                setRules(response.data.Data);
            }
        } catch (error) {
            console.error("Error fetching rules:", error);
            setError("Failed to load rules");
        } finally {
            setLoading(false);
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
            <div className='col-12 px-4 py-2' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
                <h4 className="mb-4">Rules</h4>

                {rules.map((ruleSet, index) => {
                    try {
                        const parsedRules = JSON.parse(ruleSet.rules);
                        return (
                            <div key={ruleSet.id} className="mb-4 p-3" style={{ backgroundColor: '#26284c', borderRadius: '5px' }}>
                                <h6 className="mb-3">Rule Set #{ruleSet.id}</h6>
                                {parsedRules.map((rule, ruleIndex) => (
                                    <div 
                                        key={ruleIndex} 
                                        className="mb-2 p-2" 
                                        style={{ 
                                            backgroundColor: '#191a32',
                                            borderRadius: '3px'
                                        }}
                                    >
                                        <p className="mb-0" style={{ color: '#8789c3' }}>{rule.rules}</p>
                                    </div>
                                ))}
                            </div>
                        );
                    } catch (error) {
                        console.error(`Error parsing rules for set ${ruleSet.id}:`, error);
                        return (
                            <div key={ruleSet.id} className="mb-4 p-3" style={{ backgroundColor: '#26284c', borderRadius: '5px' }}>
                                <p>Error loading this rule set</p>
                            </div>
                        );
                    }
                })}

                {rules.length === 0 && (
                    <div className="text-center py-4">
                        <p>No rules found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewRules;