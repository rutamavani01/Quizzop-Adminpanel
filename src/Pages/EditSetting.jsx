import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'reactstrap';
import { fetchSetting, updateSetting } from '../Conf/Api';

function EditSetting() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [settingData, setSettingData] = useState({
        title: '',
        logo: null,
        colorSettings: {
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
        }
    });

    useEffect(() => {
        loadSettingData();
    }, [id]);

    const loadSettingData = async () => {
        try {
            const data = await fetchSetting(id);

            setSettingData({
                title: data.Data.title || '',
                logo: data.Data.logo ? {
                    preview: data.Data.logo,
                    name: data.Data.logo.split(/[\/\\]/).pop(),
                    path: data.Data.logo
                } : null,
                colorSettings: {
                    bgcolor: data.Data.bgcolor || '#000000',
                    cardcolor: data.Data.cardcolor || '#000000',
                    bordercolor: data.Data.bordercolor || '#000000',
                    textcolor: data.Data.textcolor || '#000000',
                    loginbuttoncolor: data.Data.loginbuttoncolor || '#000000',
                    headingtextcolor: data.Data.headingtextcolor || '#000000',
                    titlebuttoncolor: data.Data.titlebuttoncolor || '#000000',
                    correctanscolor: data.Data.correctanscolor || '#000000',
                    wronganscolor: data.Data.wronganscolor || '#000000',
                    loginbuttonbordercolor: data.Data.loginbuttonbordercolor || '#000000'
                }
            });
        } catch (err) {
            setError('Failed to load setting data');
            console.error('Error loading setting:', err);
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check file type
            if (!file.type.match('image.*')) {
                setError('Please select an image file');
                return;
            }

            // Check file size (e.g., 5MB limit)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                setError('File size should be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                const newLogo = {
                    file: file,
                    preview: reader.result,
                    name: file.name,
                    size: `${(file.size / 1024).toFixed(2)} KB`,
                    type: file.type
                };
                setSettingData(prev => ({
                    ...prev,
                    logo: newLogo
                }));
            };
            reader.readAsDataURL(file);

            // Clear any previous errors
            setError(null);
        }
    };

    const handleColorChange = (event, colorKey) => {
        setSettingData((prev) => ({
            ...prev,
            colorSettings: {
                ...prev.colorSettings,
                [colorKey]: event.target.value
            }
        }));
    };

    const handleTitleChange = (event) => {
        setSettingData((prev) => ({
            ...prev,
            title: event.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', settingData.title);

            // Handle logo upload
            if (settingData.logo?.file) {
                formData.append('logo', settingData.logo.file);
            } else if (settingData.logo?.path) {
                // If it's an existing logo, send the path
                formData.append('existingLogo', settingData.logo.path);
            }

            // Append color settings
            Object.entries(settingData.colorSettings).forEach(([key, value]) => {
                formData.append(key, value);
            });

            await updateSetting(id, formData);
            navigate('/setting');
        } catch (err) {
            setError('Failed to update settings');
            console.error('Error updating settings:', err);
        }
    };


    if (error) {
        return (
            <div className="text-white p-4">
                <div className="alert alert-danger">{error}</div>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/setting')}
                >
                    Back to Settings
                </button>
            </div>
        );
    }

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
        <div className="p-4">
            <h5 className="text-white mb-3">Edit Setting</h5>
            <form onSubmit={handleSubmit}>
                <div className="col-12 px-4 py-2" style={{ backgroundColor: '#191a32', color: 'white', borderRadius: '5px' }}>
                    {/* Title Input */}
                    <div className="mb-4">
                        <label className="mb-2" style={{ fontSize: '17px' }}>Title</label>
                        <input
                            className="form-control"
                            type="text"
                            value={settingData.title}
                            onChange={handleTitleChange}
                            style={{
                                border: '1px solid #6063af',
                                backgroundColor: 'transparent',
                                borderRadius: '5px',
                                color: 'white'
                            }}
                        />
                    </div>

                    {/* Logo Upload */}
                    <div className="mb-4">
                        <label className="mb-2" style={{ fontSize: '17px' }}>Logo</label>
                        {settingData.logo && (
                            <Card className="mb-2" style={{ backgroundColor: 'transparent', border: '1px solid #6063af' }}>
                                <div className="p-2">
                                    <Row className="align-items-center">
                                        <Col xs="auto">
                                            <img
                                                src={settingData.logo.preview}
                                                alt="Logo Preview"
                                                className="rounded"
                                                height="80"
                                            />
                                        </Col>
                                        <Col>
                                            <p className="text-white mb-1">{settingData.logo.name}</p>
                                            <p className="text-white mb-0">{settingData.logo.size}</p>
                                        </Col>
                                        <Col xs="auto">
                                            {/* <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={handleRemoveLogo}
                                            >
                                                Remove
                                            </button> */}
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        )}
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            className="form-control"
                            accept="image/*"
                            style={{
                                border: '1px solid #6063af',
                                backgroundColor: 'transparent',
                                color: 'white'
                            }}
                        />
                        {error && <div className="text-danger mt-2">{error}</div>}
                    </div>

                    {/* Color Settings */}
                    <div className="row">
                        {Object.entries(settingData.colorSettings).map(([key, value]) => (
                            <div key={key} className="col-md-12 mb-4">
                                <p
                                    style={{
                                        fontSize: '17px',
                                        marginBottom: '5px'
                                    }}
                                >
                                    {colorLabels[key]}:
                                </p>
                                <input
                                    type="color"
                                    className="form-control form-control-color w-100"
                                    value={value}
                                    onChange={(e) => handleColorChange(e, key)}
                                    style={{
                                        border: '1px solid #6063af',
                                        backgroundColor: 'transparent',
                                        borderRadius: '5px',
                                        color: 'white'
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="btn text-white px-5 me-2"
                            style={{ backgroundColor: '#404380' }}

                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            className="btn text-white px-5"
                            style={{ backgroundColor: '#6c757d' }}
                            onClick={() => navigate('/setting')}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditSetting;
