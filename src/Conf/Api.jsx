import axios from 'axios';

// Set the base URL for your API
const API = axios.create({
    baseURL: 'http://192.168.1.8:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a category
export const addCategory = async (categoryData) => {
    try {
        // Create FormData object
        const formData = new FormData();

        // Append all category data to FormData
        formData.append('title', categoryData.name);
        formData.append('description', categoryData.description);
        formData.append('endtime', categoryData.endtime);
        formData.append('playcoin', categoryData.playcoin);
        formData.append('wincoin', categoryData.wincoin);

        // Handle image data
        if (categoryData.image) {
            // Convert base64 to blob
            const base64Data = categoryData.image.split(',')[1];
            const blob = await fetch(categoryData.image).then(res => res.blob());
            formData.append('image', blob, 'image.jpg');
        }

        const response = await API.post('/category', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
};

// Fetch categories
export const getCategories = async () => {
    try {
        const response = await API.get('/category');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Fetch category by ID
export const getCategoryById = async (id) => {
    try {
        const response = await API.get(`/category/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category:', error);
        throw error;
    }
};

// Update category by ID
export const updateCategoryById = async (id, data) => {
    try {
        const response = await API.put(`/category/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Failed to update category:', error);
        throw error;
    }
};

// delete category
export const handleDeleteCategory = async (id) => {
    try {
        const response = await API.delete(`/category/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting category:', error);
        alert('Error deleting category.');
    }
}

// Quiz
export const getCategoriesDrodown = async () => {
    try {
        const response = await API.get('/category');

        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data;
        } else {
            console.error('Unexpected response format:', response.data);
            return []
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const addQuiz = async (quizData) => {
    try {
        const response = await API.post('/quizque', quizData);
        return response.data;
    } catch (error) {
        console.error('Failed to add quiz:', error);
        throw error;
    }
};

export const getQuizzes = async () => {
    try {
        const response = await API.get(`/quizque`);
        return response.data;
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        throw error;
    }
};

export const deleteQuiz = async (id) => {
    try {
        await API.delete(`/quizque/${id}`);
    } catch (error) {
        console.error('Error deleting quiz:', error);
        throw error;
    }
};

export const fetchQuizById = async (id) => {
    try {
        const response = await API.get(`/quizque/${id}`);
        // console.log(response.data);
        return response.data;

    } catch (error) {
        console.error('Error fetching quiz data:', error);
        throw error;
    }
};

export const updateQuiz = async (id, quizData) => {
    try {
        const response = await API.put(`/quizque/${id}`, quizData);
        return response.data;
    } catch (error) {
        console.error('Error updating quiz:', error);
        throw error;
    }
};

// setting
export const addSetting = async (settingData) => {
    try {
        const response = await API.post('/setting', settingData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding setting:', error);
        throw error;
    }
};

// rules
export const addRules = async (rulesData) => {
    try {
        const response = await API.post('/rules', { rules: rulesData });
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error('Error adding rules:', error);
        throw error;
    }
};

export const getRules = async () => {
    try {
        const response = await API.get('/rules');
        return response;
    } catch (error) {
        console.error("Error fetching rules:", error);
        throw error;
    }
}