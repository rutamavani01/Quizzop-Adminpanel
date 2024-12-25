import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Correcting the import to 'react-router-dom'

const ViewQuiz = () => {
    const [quizzes, setQuizzes] = useState([]);

    // Fetch quizzes from localStorage when the component mounts
    useEffect(() => {
        const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
        setQuizzes(storedQuizzes);
    }, []);

    // Function to handle quiz deletion
    const handleDelete = (index) => {
        const updatedQuizzes = quizzes.filter((_, quizIndex) => quizIndex !== index);
        setQuizzes(updatedQuizzes);
        localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    };

    return (
        <div className="mt-5 p-3" style={{ backgroundColor: '#191a32' }}>
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
                        {quizzes.map((quiz, index) => (
                            <tr key={index}>
                                <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>{quiz.categoryName}</td>
                                <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>{quiz.question}</td>
                                <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                                    A: {quiz.optionA}<br />
                                    B: {quiz.optionB}<br />
                                    C: {quiz.optionC}<br />
                                    D: {quiz.optionD}
                                </td>
                                <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>{quiz.correctAnswer}</td>
                                <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                                    <Link
                                        to={`/edit-quiz/${index}`}
                                        className="text-success me-3 fs-5"
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(index)} // Call handleDelete with the correct index
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
                <p className="text-white">No quizzes available.</p>
            )}
        </div>
    );
};

export default ViewQuiz;
