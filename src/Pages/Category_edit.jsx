import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById, updateCategoryById } from '../Conf/Api';

const Category_edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const BASE_URL = 'http://192.168.1.10:8000';

    const [category, setCategory] = useState({
        title: '',
        description: '',
        image: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [isNewImage, setIsNewImage] = useState(false);

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            try {
                const response = await getCategoryById(id);
                console.log('API Response:', response);

                if (response && response.data) {
                    const categoryData = response.data;
                    setCategory({
                        title: categoryData.title || '',
                        description: categoryData.description || '',
                        image: categoryData.image || ''
                    });

                    if (categoryData.image) {
                        // Fix: Properly handle both backslash and forward slash
                        const filename = categoryData.image.split(/[\\\/]/).pop();
                        const imageUrl = `${BASE_URL}/uploads/${filename}`;
                        setPreviewImage(imageUrl);
                        setIsNewImage(false);
                    }
                }
            } catch (err) {
                setError('Failed to fetch category details. Please try again.');
                console.error('Error fetching category:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('File size should not exceed 5MB');
                return;
            }

            setSelectedFile(file); // Fix: Store only the file
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setIsNewImage(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');

        if (!category.title.trim()) {
            setError('Category name is required');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', category.title);
            formData.append('description', category.description);

            // Fix: Properly handle image upload
            if (selectedFile && isNewImage) {
                formData.append('image', selectedFile);
            } else if (category.image && !isNewImage) {
                // Fix: Send the existing image path
                formData.append('existingImage', category.image);
            }

            // Fix: Log FormData contents for debugging
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            const response = await updateCategoryById(id, formData);
            console.log('Update Response:', response);

            if (response.success) {
                navigate('/category', {
                    state: { message: 'Category updated successfully!' }
                });
            } else {
                setError(response.message || 'Failed to update category');
            }
        } catch (err) {
            setError('An error occurred while updating the category');
            console.error('Update error:', err);
        }
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (isNewImage) return previewImage;
        // Fix: Handle both backslash and forward slash
        const filename = imagePath.split(/[\\\/]/).pop();
        return `${BASE_URL}/uploads/${filename}`;
    };

    if (loading) {
        return (
            <div className="p-4 text-white">
                Loading category details...
            </div>
        );
    }

    return (
        <div className="p-4">
            <h5 className="text-white mb-3">Edit Category</h5>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <form onSubmit={handleUpdate} className="col-12 p-4" style={{
                backgroundColor: '#191a32',
                color: 'white',
                borderRadius: '5px'
            }}>
                <div className="mb-4">
                    <label className="fw-bold mb-2 d-block" style={{ fontSize: '17px' }}>
                        Category Image
                    </label>
                    {previewImage && (
                        <div className="mb-3">
                            <img
                                src={getImageUrl(category.image)}
                                alt="Category preview"
                                className="rounded"
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                onError={(e) => {
                                    console.error('Image load error:', e);
                                    e.target.src = '/placeholder.jpg';
                                }}
                            />
                        </div>
                    )}
                    {!previewImage && (
                        <p className="text-muted">No image available</p>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="form-control mt-2"
                        style={{ backgroundColor: 'rgb(25, 26, 50)', color: 'white' }}
                    />
                </div>

                <div className="mb-4">
                    <label className="fw-bold mb-2" style={{ fontSize: '17px' }}>
                        Category Name
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={category.title}
                        onChange={handleInputChange}
                        className="form-control"
                        style={{ color: 'white', backgroundColor: 'rgb(25, 26, 50)' }}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="fw-bold mb-2" style={{ fontSize: '17px' }}>
                        Category Description
                    </label>
                    <textarea
                        name="description"
                        value={category.description}
                        onChange={handleInputChange}
                        className="form-control"
                        style={{
                            color: 'white',
                            backgroundColor: 'rgb(25, 26, 50)',
                            minHeight: '100px'
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{ backgroundColor: '#404380' }}
                    className="btn text-white px-5 waves-effect waves-light"
                >
                    Update Category
                </button>
            </form>
        </div>
    );
};

export default Category_edit;