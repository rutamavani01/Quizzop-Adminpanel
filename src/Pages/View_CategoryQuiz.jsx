import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCategoriesDrodown, getQuizSort, deleteQuiz } from '../Conf/Api';

const View_CategoryQuiz = () => {
    const { id } = useParams();
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategoriesDrodown(); // Fetch categories
                setCategories(data || []); // Ensure it sets an array
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories([]); // Fallback to empty array in case of error
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchQuizQuestions = async () => {
            try {
                const response = await getQuizSort(id);
                setQuizQuestions(response.data.data);

                // Find category name based on id
                const category = categories.find((cat) => cat.id === parseInt(id));
                setCategoryName(category ? category.title : 'Category not found');
            } catch (error) {
                console.error('Failed to fetch quiz questions:', error);
            }
        };

        if (categories.length > 0) {
            fetchQuizQuestions();
        }
    }, [id, categories]);

    const handleDelete = async (id) => {
        try {
            await deleteQuiz(id);
            setQuizQuestions((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== id));
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };

    return (
        <div className='p-4'>
            <div className='col-12 px-4 py-2' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
                <h2 className='mb-5'> {categoryName}</h2>
                {quizQuestions.length > 0 ? (
                    <table className="quiz-table w-100 table ">
                        <thead>
                            <tr>
                                {/* <th>Category</th> */}
                                <th  style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }} >Question</th>
                                <th  style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }} >Options</th>
                                <th  style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }} >Correct Answer</th>
                                <th  style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }} >Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizQuestions.map((quiz) => (
                                <tr key={quiz.id}>
                                    <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>{quiz.question}</td>
                                    <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}> 
                                        A: {quiz.A} <br />
                                        B: {quiz.B} <br />
                                        C: {quiz.C} <br />
                                        D: {quiz.D}
                                    </td>
                                    <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>{quiz.answer}</td>
                                    <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                                        <Link
                                            to={`/edit-quiz/${quiz.id}`}
                                            className="text-success me-3 fs-5"
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(quiz.id)}
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
                ) : (
                    <p>No quiz found for this category.</p>
                )}
            </div>
        </div>
    );
};

export default View_CategoryQuiz;
