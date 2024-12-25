import React from 'react';
import { Link } from 'react-router';

const ViewSetting = ({ settingsList, setSettingsList, setColorSettings, setSelectedFiles, setEditIndex }) => {
    function handleDelete(index) {
        const updatedSettingsList = settingsList.filter((_, i) => i !== index);
        setSettingsList(updatedSettingsList);
        localStorage.setItem('settingsList', JSON.stringify(updatedSettingsList));
        alert('Setting deleted successfully!');
    }

    return (
        <div className='col-12 mt-4'>
            <h5 className="text-white mb-3">Saved Settings</h5>
            <table className="table" style={{ backgroundColor: '#191a32' }}>
                <thead style={{ backgroundColor: 'transparent' }}>
                    <tr>
                        <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>#</th>
                        <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Title</th> {/* Add Title column */}
                        <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Background Color</th>
                        <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Card Color</th>
                        <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Border Color</th>
                        <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Text Color</th>
                        <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Login Button Color</th>
                        <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Files</th>
                        <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: 'transparent' }}>
                    {settingsList.map((setting, index) => (
                        <tr key={setting.id}>
                            <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>{index + 1}</td>
                            <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>{setting.title}</td> {/* Display title */}
                            <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>{setting.colorSettings.backgroundColor}</td>
                            <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>{setting.colorSettings.cardColor}</td>
                            <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>{setting.colorSettings.borderColor}</td>
                            <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>{setting.colorSettings.textColor}</td>
                            <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>{setting.colorSettings.loginButtonColor}</td>
                            <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                                {setting.selectedFiles && setting.selectedFiles.length > 0 ? (
                                    setting.selectedFiles.map((file, i) => (
                                        <div key={i}>
                                            <img src={file.preview} alt={file.name} height="50" weight="50" style={{ marginBottom: '5px' }} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No Files</p>
                                )}
                            </td>
                            <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                                <Link to={`/edit-setting/${setting.id}`}>
                                    <button
                                        className="text-success me-3 fs-5"
                                        style={{ border: 'none', background: 'transparent' }}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="text-danger fs-5"
                                    style={{ border: 'none', background: 'transparent' }}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewSetting;
