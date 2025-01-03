import React, { useState } from 'react';
import { addSetting } from '../Conf/Api';
import { Link, useNavigate } from 'react-router';
import ViewSetting from './ViewSetting';

function Setting() {
    const [colorSettings, setColorSettings] = useState({
        bgcolor: '',
        loginbuttoncolor: '',
        loginbuttonbordercolor: '',
        cardcolor: '',
        bordercolor: '',
        headingtextcolor: '',
        textcolor: '',
        titlebuttoncolor: '',
        correctanscolor: '',
        wronganscolor: ''
    });

    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [lastSubmittedColors, setLastSubmittedColors] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [settingId, setSettingId] = useState(null);

    const navigate = useNavigate();

    const handleColorChange = (event, colorKey) => {
        setColorSettings(prev => ({
            ...prev,
            [colorKey]: event.target.value
        }));
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append('bgcolor', colorSettings.bgcolor);
        formData.append('loginbuttoncolor', colorSettings.loginbuttoncolor);
        formData.append('loginbuttonbordercolor', colorSettings.loginbuttonbordercolor);
        formData.append('title', title);
        formData.append('cardcolor', colorSettings.cardcolor);
        formData.append('bordercolor', colorSettings.bordercolor);
        formData.append('headingtextcolor', colorSettings.headingtextcolor);
        formData.append('textcolor', colorSettings.textcolor);
        formData.append('titlebuttoncolor', colorSettings.titlebuttoncolor);
        formData.append('correctanscolor', colorSettings.correctanscolor);
        formData.append('wronganscolor', colorSettings.wronganscolor);

        // Add image if selected
        if (image) {
            formData.append('logo', image);
        }

        try {
            const response = await addSetting(formData);
            setLastSubmittedColors(colorSettings);
            setSettingId(response.data.id);
            setTitle("");
            setImage(null);

            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Error saving settings');
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <div className='p-4'>
            {/* <h5 className="text-white mb-3">Setting Add</h5> */}

            {/* <div className='col-12 px-4 py-2' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
                <p className='mb-2' style={{ fontSize: '17px' }}>Logo</p>
                <input
                    className="form-control w-100 mb-3"
                    type="file"
                    onChange={handleImageChange}
                    style={{
                        border: '1px solid #6063af',
                        backgroundColor: 'transparent',
                        borderRadius: '5px',
                        width: '100%',
                        fontSize: '15px',
                        color: 'white',
                    }}
                />

                <p className='mb-2' style={{ fontSize: '17px' }}>Title</p>
                <input
                    className="form-control w-100"
                    type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    style={{
                        border: '1px solid #6063af',
                        backgroundColor: 'transparent',
                        borderRadius: '5px',
                        width: '100%',
                        fontSize: '15px',
                        color: 'white',
                    }}
                />
            </div>

            <div className='col-12 px-4 py-2 d-flex flex-wrap' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
                {Object.keys(colorSettings).map((key, index) => (
                    <div className="mb-4 w-100" key={index}>
                        <p className='mb-2' style={{ fontSize: '17px' }}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</p>
                        <input
                            className="form-control form-control-color w-100 mb-3"
                            type="color"
                            value={colorSettings[key]}
                            onChange={(e) => handleColorChange(e, key)}
                            style={{
                                border: '1px solid #6063af',
                                backgroundColor: 'transparent',
                                borderRadius: '5px',
                                width: '100%',
                                fontSize: '15px',
                                color: 'white',
                            }}
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleSubmit}
                    style={{ backgroundColor: '#404380' }}
                    className="btn text-white px-5 mt-2 me-3"
                >
                    {isEditing ? 'Update' : 'Submit'}
                </button>

                <button
                    type="button"
                    style={{ backgroundColor: '#404380' }}
                    className="btn text-white px-5 mt-2"
                >
                    <Link
                        to={() => settingId && navigate(`/edit-setting/${settingId}`)}
                        className="text-success me-3 fs-5"
                    >
                        Edit
                    </Link>
                </button>
            </div> */}

            <ViewSetting />
        </div>
    );
}

export default Setting;
