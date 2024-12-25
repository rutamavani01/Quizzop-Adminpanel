import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, CardBody, CardTitle } from 'reactstrap';
import Dropzone from 'react-dropzone';
import ViewSetting from './ViewSetting';

function Setting() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [colorSettings, setColorSettings] = useState({
        backgroundColor: '#191a32',
        cardColor: '#26284c',
        borderColor: '#282a4f',
        headingTextColor: '#ffffff',
        textColor: '#8789c3',
        titleButtonColor: '#FFD2A0',
        correctAnswerButtonColor: '#008000',
        wrongAnswerButtonColor: '#FF0000',
        loginButtonColor: 'green',
    });
    const [settingsList, setSettingsList] = useState([]);
    const [title, setTitle] = useState("");  // State for the title input

    useEffect(() => {
        const savedSettingsList = JSON.parse(localStorage.getItem('settingsList')) || [];
        setSettingsList(savedSettingsList);
    }, []);

    function handleAcceptedFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            const updatedFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            });
            setSelectedFiles([updatedFile]);
        }
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    function handleColorChange(event, colorKey) {
        setColorSettings({
            ...colorSettings,
            [colorKey]: event.target.value,
        });
    }

    function handleSubmit() {
        if (!selectedFiles.length || !title.trim()) {
            alert('Please provide a title and upload a logo before submitting.');
            return;
        }

        const newSetting = {
            id: Date.now(),
            title, 
            colorSettings,
            selectedFiles: selectedFiles.map(file => ({
                name: file.name,
                preview: file.preview,
                size: file.formattedSize
            })),
            createdAt: new Date().toISOString()
        };

        const updatedSettingsList = [...settingsList, newSetting];
        setSettingsList(updatedSettingsList);
        localStorage.setItem('settingsList', JSON.stringify(updatedSettingsList));

        alert('Settings saved successfully!');
        setTitle(""); 
        setColorSettings({
            backgroundColor: '#191a32',
            cardColor: '#26284c',
            borderColor: '#282a4f',
            headingTextColor: '#ffffff',
            textColor: '#8789c3',
            titleButtonColor: '#FFD2A0',
            correctAnswerButtonColor: '#008000',
            wrongAnswerButtonColor: '#FF0000',
            loginButtonColor: 'green',
        });
        setSelectedFiles([]);
    }

    return (
        <div className='p-4'>
            <h5 className="text-white mb-3">Setting Add</h5>
            <div className='col-12 d-flex flex-wrap px-4 py-2' style={{ backgroundColor: 'transparent', color: 'white', width: '100%', borderRadius: '5px' }}>
                <Card style={{ backgroundColor: 'transparent', border: 'none', width: '100%' }}>
                    <CardBody className='p-0'>
                        <CardTitle style={{ fontSize: '17px' }} className="text-white">Logo</CardTitle>
                        <div className="mb-5 m-auto">
                            <Form className='text-center text-white'>
                                <Dropzone onDrop={acceptedFiles => handleAcceptedFiles(acceptedFiles)}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div className="dropzone" style={{ border: `2px dotted ${colorSettings.borderColor}`, padding: '50px', borderRadius: '5px' }}>
                                            <div className="dz-message needsclick" {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <div className="mb-1">
                                                    <i className="bi bi-cloud-arrow-up display-4 text-white"></i>
                                                </div>
                                                <h4>Drop files here or click to upload.</h4>
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                                <div className="dropzone-previews mt-3" id="file-previews">
                                    {selectedFiles.map((f, i) => (
                                        <Card
                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                            key={i + "-file"}
                                            style={{ backgroundColor: 'transparent', border: 'none' }}
                                        >
                                            <div className="p-2">
                                                <Row className="align-items-center">
                                                    <Col className="col-auto">
                                                        <img
                                                            data-dz-thumbnail=""
                                                            height="80"
                                                            className="avatar-sm rounded bg-light"
                                                            alt={f.name}
                                                            src={f.preview}
                                                        />
                                                    </Col>
                                                    <Col className='text-start'>
                                                        <p className="text-white font-weight-bold">{f.name}</p>
                                                        <p className="mb-0 text-white">
                                                            <strong>{f.formattedSize}</strong>
                                                        </p>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </Form>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className='col-12 px-4 py-2 ' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
                <p className='mb-2' style={{ fontSize: '17px' }}>Title</p>
                <input
                    className="form-control w-100"
                    type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)}  // Bind input value to title state
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
                    <div key={index} className="mb-4 w-100">
                        <p className='mb-2' style={{ fontSize: '17px' }}>{key.replace(/([A-Z])/g, ' $1')}</p>
                        <input
                            className="form-control form-control-color w-100"
                            type="color"
                            value={colorSettings[key]}
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
                    onClick={handleSubmit}
                    style={{ backgroundColor: '#404380' }}
                    className="btn text-white px-5 mt-5"
                >
                    Submit
                </button>
            </div>

            <ViewSetting
                settingsList={settingsList}
                setSettingsList={setSettingsList}
                setColorSettings={setColorSettings}
                setSelectedFiles={setSelectedFiles}
            />
        </div>
    );
}

export default Setting;
