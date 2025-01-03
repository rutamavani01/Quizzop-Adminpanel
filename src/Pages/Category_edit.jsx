import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById, updateCategoryById } from '../Conf/Api';
import Dropzone from 'react-dropzone';

const CategoryEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        title: '',
        description: '',
        image: '',
    });

    const [previewImage, setPreviewImage] = useState(''); // For image preview
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
                        image: response.data.image || '',
                    });
                    setPreviewImage(response.data.image || ''); // Set initial preview
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

    const handleImageDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles[0]) {
            const imageFile = acceptedFiles[0];
            setCategory({
                ...category,
                image: imageFile, // Store the file for upload
            });
            setPreviewImage(URL.createObjectURL(imageFile)); // Show preview
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

            // Handle image: Add only if it's a new File, otherwise use the existing URL
            if (category.image instanceof File) {
                formData.append('image', category.image);
            } else {
                formData.append('image', category.image); // Pass existing URL as is
            }

            const response = await updateCategoryById(id, formData);

            if (response.success) {
                alert('Category updated successfully!');
                navigate('/category');
            } else {
                throw new Error(response.message || 'Failed to update category');
            }
        } catch (error) {
            alert(error.message || 'Failed to update category. Please try again.');
            console.error('Error updating category:', error);
        }
    };

    if (loading) {
        return <div className="p-4 text-white">Loading category details...</div>;
    }

    if (error) {
        return <div className="p-4 text-white">{error}</div>;
    }

    return (
        <div className="p-4">
            <h5 className="text-white mb-3">Edit Category</h5>
            <div
                className="col-12 p-4"
                style={{
                    backgroundColor: '#191a32',
                    color: 'white',
                    width: '100%',
                    borderRadius: '5px',
                }}
            >
                <div className="text-white">
                    <p className="mb-2" style={{ fontSize: '17px' }}>Category Image</p>
                    <Dropzone accept="image/*" onDrop={handleImageDrop}>
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
                                    {category.image instanceof File ? (
                                        <img
                                            src={URL.createObjectURL(category.image)}
                                            alt={category.title}
                                            style={{
                                                maxWidth: "70px",
                                                height: "auto",
                                                objectFit: "cover"
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={category.image} // Use the URL directly for existing images
                                            alt={category.title}
                                            style={{
                                                maxWidth: "70px",
                                                height: "auto",
                                                objectFit: "cover"
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </Dropzone>

                </div>

                <div className="text-white mt-4">
                    <p className="mb-2" style={{ fontSize: '17px' }}>Category Name</p>
                    <input
                        type="text"
                        className="form-control py-2"
                        style={{
                            border: '1px solid #6063af',
                            backgroundColor: 'transparent',
                            borderRadius: '5px',
                            width: '100%',
                            fontSize: '15px',
                            color: 'white',
                        }}
                        value={category.title}
                        onChange={(e) => setCategory({ ...category, title: e.target.value })}
                        placeholder="Enter category name"
                    />
                </div>

                <div className="text-white mt-4">
                    <p className="mb-2" style={{ fontSize: '17px' }}>Category Description</p>
                    <textarea
                        className="form-control py-2"
                        style={{
                            border: '1px solid #6063af',
                            backgroundColor: 'transparent',
                            borderRadius: '5px',
                            width: '100%',
                            fontSize: '15px',
                            color: 'white',
                            minHeight: '100px',
                        }}
                        value={category.description}
                        onChange={(e) => setCategory({ ...category, description: e.target.value })}
                        placeholder="Enter category description"
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="button"
                        style={{ backgroundColor: '#404380' }}
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

export default CategoryEdit;
