import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'reactstrap';

function EditSetting() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [setting, setSetting] = useState(null);

    useEffect(() => {
        // Fetch the setting by ID from local storage
        const settingsList = JSON.parse(localStorage.getItem('settingsList')) || [];
        const selectedSetting = settingsList.find(item => item.id.toString() === id);
        if (selectedSetting) {
            setSetting(selectedSetting);
        } else {
            alert('Setting not found!');
            navigate('/setting');
        }
    }, [id, navigate]);

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const newFile = {
                name: file.name,
                size: `${(file.size / 1024).toFixed(2)} KB`,
                preview: URL.createObjectURL(file),
            };
            setSetting(prev => ({
                ...prev,
                selectedFiles: [newFile], // Replace with the new file
            }));
        }
    }

    function handleColorChange(event, colorKey) {
        setSetting(prev => ({
            ...prev,
            colorSettings: {
                ...prev.colorSettings,
                [colorKey]: event.target.value,
            },
        }));
    }

    function handleTitleChange(event) {
        setSetting(prev => ({
            ...prev,
            title: event.target.value, // Update the title in the state
        }));
    }

    function handleSave() {
        const settingsList = JSON.parse(localStorage.getItem('settingsList')) || [];
        const updatedSettingsList = settingsList.map(item =>
            item.id.toString() === id
                ? { ...item, title: setting.title, colorSettings: setting.colorSettings, selectedFiles: setting.selectedFiles }
                : item
        );
        localStorage.setItem('settingsList', JSON.stringify(updatedSettingsList));
        alert('Settings updated successfully!');
        navigate('/setting');
    }

    if (!setting) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h5 className="text-white mb-3">Edit Setting</h5>
            <div
                className="col-12 px-4 py-2 d-flex flex-wrap"
                style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}
            >
                {/* Render title field */}
                <div className="mb-4 w-100">
                    <p className="mb-2" style={{ fontSize: '17px' }}>Title</p>
                    <input
                        className="form-control"
                        type="text"
                        value={setting.title || ''}
                        onChange={handleTitleChange}
                        style={{
                            border: '1px solid #6063af',
                            backgroundColor: 'transparent',
                            borderRadius: '5px',
                            fontSize: '15px',
                            color: 'white',
                        }}
                    />
                </div>

                {/* Render image preview */}
                <div className="w-100 mt-4 mb-4">
                    <h6 className="text-white">Uploaded Image</h6>
                    <div className="dropzone-previews mt-3" id="file-previews">
                        {setting.selectedFiles && setting.selectedFiles.length > 0 ? (
                            <Card
                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                <div className="p-2">
                                    <Row className="align-items-center">
                                        <Col className="col-auto">
                                            <img
                                                data-dz-thumbnail=""
                                                height="80"
                                                className="avatar-sm rounded bg-light"
                                                alt={setting.selectedFiles[0].name}
                                                src={setting.selectedFiles[0].preview}
                                            />
                                        </Col>
                                        <Col className="text-start">
                                            <p className="text-white font-weight-bold">
                                                {setting.selectedFiles[0].name}
                                            </p>
                                            <p className="mb-0 text-white">
                                                <strong>{setting.selectedFiles[0].size}</strong>
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        ) : (
                            <p className="text-white">No image uploaded</p>
                        )}
                    </div>
                    <input
                        type="file"
                        onChange={handleFileUpload}
                        className="form-control mt-3"
                        style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            border: '1px solid #6063af',
                            borderRadius: '5px',
                        }}
                    />
                </div>

                {/* Render color settings */}
                {Object.keys(setting.colorSettings).map((key, index) => (
                    <div key={index} className="mb-4 w-100">
                        <p className="mb-2" style={{ fontSize: '17px' }}>
                            {key.replace(/([A-Z])/g, ' $1')}
                        </p>
                        <input
                            className="form-control form-control-color w-100"
                            type="color"
                            value={setting.colorSettings[key]}
                            onChange={event => handleColorChange(event, key)}
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
                    onClick={handleSave}
                    style={{ backgroundColor: '#404380' }}
                    className="btn text-white px-5 mt-5"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default EditSetting;
