import React, { useState, useEffect } from 'react';
import { addSetting } from '../Conf/Api';

function Setting() {
    const defaultColors = {
        bgcolor: '#191a32',
        loginbuttoncolor: 'green',
        loginbuttonbordercolor: '#6063af',
        cardcolor: '#26284c',
        bordercolor: '#282a4f',
        headingtextcolor: '#ffffff',
        textcolor: '#8789c3',
        titlebuttoncolor: '#FFD2A0',
        correctanscolor: '#008000',
        wronganscolor: '#FF0000'
    };

    const [colorSettings, setColorSettings] = useState(defaultColors);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [lastSubmittedColors, setLastSubmittedColors] = useState(null);

    // useEffect(() => {
    //     // const savedColors = localStorage.getItem('lastSubmittedColors');
    //     if (savedColors) {
    //         setLastSubmittedColors(JSON.parse(savedColors));
    //         setColorSettings(JSON.parse(savedColors));
    //     }
    // }, []);

    const handleColorChange = (event, colorKey) => {
        setColorSettings(prev => ({
            ...prev,
            [colorKey]: event.target.value
        }));
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        // Add all color settings to formData
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
            console.log('Setting added successfully:', response);

            // Save submitted colors to localStorage
            // localStorage.setItem('lastSubmittedColors', JSON.stringify(colorSettings));
            setLastSubmittedColors(colorSettings);

            // Clear form fields except colors
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
            <h5 className="text-white mb-3">Setting Add</h5>

            <div className='col-12 px-4 py-2' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
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
                {/* {Object.keys(colorSettings).map((key, index) => ( */}
                <div className="mb-4 w-100">
                    <p className='mb-2' style={{ fontSize: '17px' }}>backgroundColor</p>
                    <input
                        className="form-control form-control-color w-100 mb-3"
                        type="color"
                        value={colorSettings.bgcolor}
                        onChange={(e) => handleColorChange(e, 'bgcolor')}
                        style={{
                            border: '1px solid #6063af',
                            backgroundColor: 'transparent',
                            borderRadius: '5px',
                            width: '100%',
                            fontSize: '15px',
                            color: 'white',
                        }}
                    />

                    <p className='mb-2' style={{ fontSize: '17px' }}>Login Button Color</p>
                    <input
                        className="form-control form-control-color w-100 mb-3"
                        type="color"
                        value={colorSettings.loginbuttoncolor}
                        onChange={(e) => handleColorChange(e, 'loginbuttoncolor')}
                        style={{
                            border: '1px solid #6063af',
                            backgroundColor: 'transparent',
                            borderRadius: '5px',
                            width: '100%',
                            fontSize: '15px',
                            color: 'white',
                        }}
                    />

                    <p className='mb-2' style={{ fontSize: '17px' }}>Login Button Border Color</p>
                    <input
                        className="form-control form-control-color w-100 mb-3"
                        type="color"
                        value={colorSettings.loginbuttonbordercolor}
                        onChange={(e) => handleColorChange(e, 'loginbuttonbordercolor')}
                        style={{
                            border: '1px solid #6063af',
                            backgroundColor: 'transparent',
                            borderRadius: '5px',
                            width: '100%',
                            fontSize: '15px',
                            color: 'white',
                        }}
                    />

                    <p className='mb-2' style={{ fontSize: '17px' }}>Card Color</p>
                    <input
                        className="form-control form-control-color w-100 mb-3"
                        type="color"
                        value={colorSettings.cardcolor}
                        onChange={(e) => handleColorChange(e, 'cardcolor')}
                        style={{
                            border: '1px solid #6063af',
                            backgroundColor: 'transparent',
                            borderRadius: '5px',
                            width: '100%',
                            fontSize: '15px',
                            color: 'white',
                        }}
                    />

                    <p className='mb-2' style={{ fontSize: '17px' }}>Border Color</p>
                    <input
                        className="form-control form-control-color w-100 mb-3"
                        type="color"
                        value={colorSettings.bordercolor}
                        onChange={(e) => handleColorChange(e, 'bordercolor')}
                        style={{
                            border: '1px solid #6063af',
                            backgroundColor: 'transparent',
                            borderRadius: '5px',
                            width: '100%',
                            fontSize: '15px',
                            color: 'white',
                        }}
                    />

                    <p className='mb-2' style={{ fontSize: '17px' }}> Title Button Color</p>
                    <input
                        className="form-control form-control-color w-100 mb-3"
                        type="color"
                        value={colorSettings.titlebuttoncolor}
                        onChange={(e) => handleColorChange(e, 'titlebuttoncolor')}
                        style={{
                            border: '1px solid #6063af',
                            backgroundColor: 'transparent',
                            borderRadius: '5px',
                            width: '100%',
                            fontSize: '15px',
                            color: 'white',
                        }}
                    />

                    <p className='mb-2' style={{ fontSize: '17px' }}> Heading Text Color</p>
                    <input
                        className="form-control form-control-color w-100 mb-3"
                        type="color"
                        value={colorSettings.headingtextcolor}
                        onChange={(e) => handleColorChange(e, 'headingtextcolor')}
                        style={{
                            border: '1px solid #6063af',
                            backgroundColor: 'transparent',
                            borderRadius: '5px',
                            width: '100%',
                            fontSize: '15px',
                            color: 'white',
                        }}
                    />

                    <p className='mb-2' style={{ fontSize: '17px' }}> Correct Button Color</p>
                    <input
                        className="form-control form-control-color w-100 mb-3"
                        type="color"
                        value={colorSettings.correctanscolor}
                        onChange={(e) => handleColorChange(e, 'correctanscolor')}
                        style={{
                            border: '1px solid #6063af',
                            backgroundColor: 'transparent',
                            borderRadius: '5px',
                            width: '100%',
                            fontSize: '15px',
                            color: 'white',
                        }}
                    />

                    <p className='mb-2' style={{ fontSize: '17px' }}> Wrong Button Color</p>
                    <input
                        className="form-control form-control-color w-100 mb-1"
                        type="color"
                        value={colorSettings.wronganscolor}
                        onChange={(e) => handleColorChange(e, 'wronganscolor')}
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
                {/* ))} */}

                <button
                    type="button"
                    onClick={handleSubmit}
                    style={{ backgroundColor: '#404380' }}
                    className="btn text-white px-5 mt-2"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Setting;
