import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById, updateCategoryById } from '../Conf/Api';
import Dropzone from 'react-dropzone';

const Category_edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const BASE_URL = 'http://192.168.1.8:8000';

    const [category, setCategory] = useState({
        title: '',
        description: '',
        image: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await getCategoryById(id);
                if (response && response.data) {
                    setCategory({
                        title: response.data.title || '',
                        description: response.data.description || '',
                        image: response.data.image || ''
                    });
                }
            } catch (err) {
                setError('Failed to fetch category details.');
                console.error('Error fetching category:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    const handleFileDrop = (acceptedFiles) => {
        if (acceptedFiles.length) {
            const file = acceptedFiles[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const timestamp = new Date().getTime();
                const randomNum = Math.floor(Math.random() * 1000000000);
                const filename = `image-${timestamp}-${randomNum}.${file.name.split('.').pop()}`;
                
                setSelectedFile({
                    file: file,
                    base64: reader.result,
                    filename: filename
                });
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!category.title.trim()) {
                alert('Please enter a category name.');
                return;
            }
            if (!category.description.trim()) {
                alert('Please enter a category description.');
                return;
            }

            const formData = new FormData();
            formData.append('title', category.title);
            formData.append('description', category.description);

            if (selectedFile && selectedFile.file) {
                const file = selectedFile.file;
                const newFile = new File([file], selectedFile.filename, { type: file.type });
                formData.append('image', newFile);
            } else if (category.image) {
                // Extract just the filename from the full path
                const filename = category.image.split('/').pop();
                formData.append('image', filename);
            }

            const response = await updateCategoryById(id, formData);

            if (response.success) {
                navigate('/category');
                alert('Category updated successfully!');
            } else {
                throw new Error(response.message || 'Failed to update category');
            }
        } catch (error) {
            alert(error.message || 'Failed to update category. Please try again.');
            console.error('Error updating category:', error);
        }
    };

    const getImageSource = (imagePath) => {
        if (!imagePath) return null;

        // If it's a base64 image from new selection
        if (selectedFile && selectedFile.base64) {
            return selectedFile.base64;
        }

        // Extract filename from full path
        let filename;
        if (imagePath.includes('uploads')) {
            // Split by 'uploads/' and get the last part
            const parts = imagePath.split('uploads/');
            filename = parts[parts.length - 1];
            // Remove any remaining path segments
            filename = filename.split(/[\\/]/).pop();
        } else {
            filename = imagePath.split(/[\\/]/).pop();
        }

        return `${BASE_URL}/uploads/${filename}`;
    };

    if (loading) {
        return <div className="p-4 text-white">Loading category details...</div>;
    }

    return (
        <div className="p-4">
            <h5 className="text-white mb-3">Edit Category</h5>

            <div className="col-12 p-4" style={{ backgroundColor: "#191a32", color: "white", width: "100%", borderRadius: "5px" }}>
                <div className="text-white">
                    <p className="mb-2" style={{ fontSize: "17px" }}>Category Image</p>
                    <Dropzone onDrop={handleFileDrop} accept="image/*">
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} style={{
                                border: "1px solid #6063af",
                                backgroundColor: "transparent",
                                borderRadius: "5px",
                                width: "100%",
                                padding: "10px",
                                cursor: "pointer"
                            }}>
                                <input {...getInputProps()} />
                                <div className="text-start">
                                    {(selectedFile || category.image) ? (
                                        <img
                                            src={selectedFile ? selectedFile.base64 : getImageSource(category.image)}
                                            alt="Category"
                                            style={{ maxWidth: "70px", height: "auto", objectFit: "cover" }}
                                        />
                                    ) : (
                                        <p className="text-center">Drag and drop or click to select an image</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </Dropzone>
                </div>

                <div className="text-white mt-4">
                    <p className="mb-2" style={{ fontSize: "17px" }}>Category Name</p>
                    <input
                        type="text"
                        className="py-2"
                        style={{ border: "1px solid #6063af", backgroundColor: "transparent", borderRadius: "5px", width: "100%", fontSize: "15px", color: "white" }}
                        value={category.title}
                        onChange={(e) => setCategory({ ...category, title: e.target.value })}
                    />
                </div>

                <div className="text-white mt-4">
                    <p className="mb-2" style={{ fontSize: "17px" }}>Category Description</p>
                    <textarea
                        className="py-2"
                        style={{ border: "1px solid #6063af", backgroundColor: "transparent", borderRadius: "5px", width: "100%", fontSize: "15px", color: "white" }}
                        value={category.description}
                        onChange={(e) => setCategory({ ...category, description: e.target.value })}
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="button"
                        style={{ backgroundColor: "#404380" }}
                        className="btn text-white px-5 waves-effect waves-light text-center d-flex justify-content-start mt-3"
                        onClick={handleSubmit}
                    >
                        Update Category
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Category_edit;