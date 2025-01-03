import axios from 'axios';

// Set the base URL for your API
const API = axios.create({
    baseURL: 'http://192.168.1.8:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

const APIFORMDATA = axios.create({
    baseURL: 'http://192.168.1.8:8000/api/',
    headers: {
        'Content-Type': 'multipart/form-data',
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
        formData.append('image', categoryData.image);


        const response = await APIFORMDATA.post('/category', formData);
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
        const response = await APIFORMDATA.put(`/category/${id}`, data);
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
        throw error;
        console.error('Error adding setting:', error);
    }
};

export const getSetting = async () => {
    try {
        const response = await API.get('/setting');
        console.log(response.data.Data);

        return response.data.Data;

    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const fetchSetting = async (id) => {
    try {
        const response = await API.get(`/setting/${id}`);
        return response.data;

    } catch (error) {
        console.error('Error fetching setting data:', error);
        throw error;
    }
}

export const updateSetting = async (id, settingData) => {
    try {
        const response = await APIFORMDATA.put(`/setting/${id}`, settingData);
        return response.data;
    } catch (error) {
        console.error('Error updating quiz:', error);
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

export const fetchRules = async (id) => {
    try {
        const response = await API.get(`/rules/${id}`);
        console.log('API Response:', response.data); // Log the full response
        if (response.data && response.data.Data) {
            return response.data.Data; // Return the expected data
        } else {
            console.error('No Data found');
            return []; // Return an empty array if data is not found
        }
    } catch (error) {
        console.error('Error fetching rules data:', error);
        throw error;
    }
};

export const updateRules = async (id, rules) => {
    try {
        const response = await API.put(`/rules/${id}`, rules);
        return response.data;
    } catch (error) {
        console.error('Error updating rules:', error);
        throw error;
    }
};

export const deleteRules = async (id) => {
    try {
        await API.delete(`/rules/${id}`);
    } catch (error) {
        console.error('Error deleting rules:', error);
        throw error;
    }
};

export const getQuizSort = async (id) => {
    try {
        const response = await API.get(`/quizque/categoryfilter/${id}`);
        return response;
    } catch (error) {
        console.error("Error fetching category filter:", error);
        throw error;
    }
}

// pages
export const addPage = async (pageData) => {
    try {
        const response = await API.post('/footer', pageData)
        return response;
    } catch (error) {
        console.error("Error fetching add page:", error);
        throw error;
    }
}

// export const getPageName = async () => {
//     try {
//         const response = await API.get('/footer');
//         console.log(response.data.data);

//         return response.data.data;
//     } catch (error) {
//         console.error("Error fetching footer:", error);
//         throw error;
//     }
// }

export const getPageAllData = async (id) => {
    try {
        const response = await API.get(`/footer/all_data`);
        // console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching footer:", error);
        throw error;
    }
}

export const fetchPages = async (id) => {
    try {
        const response = await API.get(`/footer/${id}`);
        // console.log("Fetched Page Data:", response.data.data);  
        return response.data.data;  // Return the data (not the whole response)
    } catch (error) {
        console.error("Error fetching pages:", error);
        throw error;
    }
};

// Function to update the page
export const updatePage = async (id, pageData) => {
    try {
        const response = await API.put(`/footer/${id}`, pageData);
        // console.log(response.data.data);
        return response.data;
    } catch (error) {
        console.error('Error updating page:', error);
        throw error;
    }
};

export const deletePage = async (id) => {
    try {
        const response = await API.delete(`/footer/${id}`);
        // console.log(response.data.data);
        return response.data;
    } catch (error) {
        console.error('Error updating page:', error);
        throw error;
    }
}

export const login = async ({ email, password }) => {
    try {
        const response = await API.post('/login', { email, password });
        return response.data;  // Return the API response data (including token)
    } catch (error) {
        console.error('Error login page:', error);
        throw error;
    }
};
