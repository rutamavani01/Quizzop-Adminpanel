import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const EditQuiz = () => {
  const { id } = useParams();  // Get the quiz index from the URL
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState({
    categoryName: "",
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: ""
  });

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quizToEdit = storedQuizzes[id]; // Get the quiz data based on the index
    if (quizToEdit) {
      setQuizData(quizToEdit);
    }
  }, [id]);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle update quiz
  const handleUpdate = () => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    storedQuizzes[id] = quizData; // Update the quiz with new data
    localStorage.setItem('quizzes', JSON.stringify(storedQuizzes));

    alert("Quiz updated successfully!");
    navigate('/quiz'); // Navigate back to the quizzes list
  };

  // Handle delete quiz
  // const handleDelete = () => {
  //   const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
  //   storedQuizzes.splice(id, 1); // Remove the quiz at the given index
  //   localStorage.setItem('quizzes', JSON.stringify(storedQuizzes));

  //   alert("Quiz deleted successfully!");
  //   navigate('/quiz'); // Navigate back to the quizzes list
  // };

  return (
    <div className='p-4'>
      <div className="col-12 p-4" style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
        <h3>Edit Quiz</h3>

        {/* Quiz Form */}
        <div className="mb-3">
          <label className="mb-2">Category Name</label>
          <input
            type="text"
            name="categoryName"
            value={quizData.categoryName}
            onChange={handleInputChange}
            className="form-control" style={{ backgroundColor: 'transparent',color:'white' }}
          />
        </div>

        <div className="mb-3">
          <label className="mb-2">Question</label>
          <input
            type="text"
            name="question"
            value={quizData.question}
            onChange={handleInputChange}
            className="form-control"  style={{ backgroundColor: 'transparent',color:'white' }}
          />
        </div>

        <div className="mb-3">
          <label className="mb-2">Option A</label>
          <input
            type="text"
            name="optionA"
            value={quizData.optionA}
            onChange={handleInputChange}
            className="form-control"  style={{ backgroundColor: 'transparent',color:'white' }}
          />
        </div>

        <div className="mb-3">
          <label className="mb-2">Option B</label>
          <input
            type="text"
            name="optionB"
            value={quizData.optionB}
            onChange={handleInputChange}
            className="form-control" style={{ backgroundColor: 'transparent',color:'white' }}
          />
        </div>

        <div className="mb-3">
          <label className="mb-2">Option C</label>
          <input
            type="text"
            name="optionC"
            value={quizData.optionC}
            onChange={handleInputChange}
            className="form-control" style={{ backgroundColor: 'transparent',color:'white' }}
          />
        </div>

        <div className="mb-3">
          <label className="mb-2">Option D</label>
          <input
            type="text"
            name="optionD"
            value={quizData.optionD}
            onChange={handleInputChange}
            className="form-control" style={{ backgroundColor: 'transparent',color:'white' }}
          />
        </div>

        <div className="mb-3">
          <label className="mb-2">Correct Answer</label>
          <select
            name="correctAnswer"
            value={quizData.correctAnswer}
            onChange={handleInputChange}
            className="form-control"  style={{ backgroundColor: 'transparent',color:'white' }}
          >
            <option value="optionA"  style={{ backgroundColor: '#191a32',color:'white' }}>Option A</option>
            <option value="optionB"  style={{ backgroundColor: '#191a32',color:'white' }}>Option B</option>
            <option value="optionC"  style={{ backgroundColor: '#191a32',color:'white' }}>Option C</option>
            <option value="optionD"  style={{ backgroundColor: '#191a32',color:'white' }}>Option D</option>
          </select>
        </div>

        <button className="btn btn-primary" onClick={handleUpdate}>Update Quiz</button>
        {/* <button className="btn btn-danger ms-2" onClick={handleDelete}>Delete Quiz</button> */}
      </div>
    </div>
  );
};
