import React, { useEffect, useState } from 'react';
import { getSetting } from '../Conf/Api';
import { Link } from 'react-router';

const ViewSetting = () => {
    const [settingsList, setSettingsList] = useState([]);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await getSetting();
                const transformedData = [{
                    id: data.id,
                    logo: data.logo,
                    title: data.title,
                    ...data.themecolor
                }];
                setSettingsList(transformedData);
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };

        fetchSettings();
    }, []);

    const colorLabels = {
        bgcolor: 'Background Color',
        cardcolor: 'Card Color',
        bordercolor: 'Border Color',
        textcolor: 'Text Color',
        loginbuttoncolor: 'Login Button Color',
        headingtextcolor: 'Heading Text Color',
        titlebuttoncolor: 'Title Button Color',
        correctanscolor: 'Correct Answer Color',
        wronganscolor: 'Wrong Answer Color',
        loginbuttonbordercolor: 'Login Button Border Color'
    };

    return (
        <div
            className="col-12 mt-4 p-3"
            style={{
                backgroundColor: '#191a32',
                color: 'white',
                width: '100%',
                borderRadius: '5px',
            }}
        >
            <h5 className="text-white mb-3">View Settings</h5>
            {settingsList?.map((setting) => (
                <div key={setting.id}>
                    <div
                        className="col-12 px-4 py-2 mb-4"
                        style={{ borderRadius: '5px' }}
                    >
                        <div className="mb-3">
                            <span
                                className="me-3"
                                style={{ fontSize: '17px', marginBottom: '5px' }}
                            >
                                Title
                            </span>
                            <span style={{ color: '#d1d1d1' }}>
                                {setting.title || 'N/A'}
                            </span>
                        </div>

                        <div className="mb-3 col-6">
                            <p style={{ fontSize: '17px', marginBottom: '5px' }}>
                                Logo:
                            </p>
                            {setting.logo ? (
                                <img
                                    src={setting.logo}
                                    alt="Logo"
                                    style={{ borderRadius: '5px' }}
                                />
                            ) : (
                                <p style={{ color: '#d1d1d1' }}>No Logo Available</p>
                            )}
                        </div>

                        {Object.keys(colorLabels).map((colorKey ) => (
                            <div key={colorKey} className="mb-3 ">
                                <p style={{ fontSize: '17px', marginBottom: '5px' }}>
                                    {colorLabels[colorKey]}:
                                </p>
                                <div
                                    style={{
                                        backgroundColor: setting[colorKey] || '#000000',  
                                        border: '1px solid #6063af',
                                        borderRadius: '5px',
                                        width: '100%',
                                        height: '30px',
                                        cursor: 'not-allowed',
                                        pointerEvents: 'none', 
                                    }}
                                    className="p-1 "
                                />
                            </div>
                        ))}

                    </div>
                    <button type="button" style={{ backgroundColor: '#404380' }} className="btn text-white px-5 mt-2 me-3">
                        <Link to={`/edit-setting/${setting.id}`} className="text-white">Edit</Link>
                    </button>
                </div>
            ))}
            {settingsList.length === 0 && (
                <p style={{ color: 'white' }}>
                    No settings available to display.
                </p>
            )}
        </div>
    );
};

export default ViewSetting;