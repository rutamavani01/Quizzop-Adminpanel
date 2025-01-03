import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getQuizzes, deleteQuiz, getCategoriesDrodown } from '../Conf/Api';

const ViewQuiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    // console.log(quizzes);

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
        const fetchQuizzes = async () => {
            try {
                const quizzesData = await getQuizzes();
                setQuizzes(quizzesData.data);
            } catch (error) {
                console.error('Error loading quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteQuiz(id);
            setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== id));
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };

    return (
        <div className="mt-5 p-3" >
            <div className='col-12 px-4 py-2' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
            {quizzes.length > 0 ? (
                <table
                    className="table text-center"
                    style={{
                        backgroundColor: 'rgb(25, 26, 50)',
                        color: 'white',
                        width: '100%',
                        borderRadius: '5px',
                    }}
                >
                    <thead style={{ backgroundColor: 'transparent' }}>
                        <tr>
                            <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Category</th>
                            <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Question</th>
                            <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Options</th>
                            <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Correct Answer</th>
                            <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: '#191a32' }}>
                        {quizzes.map((quiz) => {
                            // Find the category title for the quiz
                            const category = categories.find((cat) => cat.id === quiz.categoryId); // Assuming `categoryId` links quiz to category
                            return (
                                <tr key={quiz.id}>
                                    <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                                        {category ? category.title : 'Category not found'}
                                    </td>
                                    <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                                        {quiz.question}
                                    </td>
                                    <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                                        A: {quiz.A}
                                        <br />
                                        B: {quiz.B}
                                        <br />
                                        C: {quiz.C}
                                        <br />
                                        D: {quiz.D}
                                    </td>
                                    <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                                        {quiz.answer}
                                    </td>
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
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p className="text-white">No quizzes available.</p>
            )}
        </div>
        </div >
    );
};

export default ViewQuiz;
