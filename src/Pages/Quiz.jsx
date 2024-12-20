import React, { useState, useEffect } from 'react';

function Quiz() {
  const [categories, setCategories] = useState([]);
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
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategories(storedCategories);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!quizData.categoryName) {
      alert("Please select a category");
      return;
    }
    // Get existing quizzes or initialize empty array
    const existingQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    // Add new quiz
    existingQuizzes.push(quizData);
    // Save back to localStorage
    localStorage.setItem('quizzes', JSON.stringify(existingQuizzes));

    alert("Quiz added successfully!");
    // Reset form
    setQuizData({
      categoryName: "",
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: ""
    });
  };

  return (
    <div className='p-4'>
      <div className='col-12 p-4 d-flex flex-wrap' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
        <div className='text-white col-6 p-2'>
          <p className='mb-2' style={{ fontSize: '17px' }}>Category Name</p>
          <select
            name="categoryName"
            value={quizData.categoryName}
            onChange={handleInputChange}
            className='py-2'
            style={{
              border: '1px solid #6063af',
              backgroundColor: 'transparent',
              borderRadius: '5px',
              width: '100%',
              fontSize: '15px',
              color: 'white',
            }}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className='text-white col-12 p-2'>
          <p className='mb-2' style={{ fontSize: '17px' }}>Question</p>
          <input
            type="text"
            name="question"
            value={quizData.question}
            onChange={handleInputChange}
            className='py-2'
            style={{
              border: '1px solid #6063af',
              backgroundColor: 'transparent',
              borderRadius: '5px',
              width: '100%',
              fontSize: '15px',
              color: 'white',
            }}
          />
        </div>

        <div className='text-white col-6 p-2'>
          <p className='mb-2' style={{ fontSize: '17px' }}>Option A</p>
          <input
            type="text"
            name="optionA"
            value={quizData.optionA}
            onChange={handleInputChange}
            className='py-2'
            style={{
              border: '1px solid #6063af',
              backgroundColor: 'transparent',
              borderRadius: '5px',
              width: '100%',
              fontSize: '15px',
              color: 'white',
            }}
          />
        </div>

        <div className='text-white col-6 p-2'>
          <p className='mb-2' style={{ fontSize: '17px' }}>Option B</p>
          <input
            type="text"
            name="optionB"
            value={quizData.optionB}
            onChange={handleInputChange}
            className='py-2'
            style={{
              border: '1px solid #6063af',
              backgroundColor: 'transparent',
              borderRadius: '5px',
              width: '100%',
              fontSize: '15px',
              color: 'white',
            }}
          />
        </div>

        <div className='text-white col-6 p-2'>
          <p className='mb-2' style={{ fontSize: '17px' }}>Option C</p>
          <input
            type="text"
            name="optionC"
            value={quizData.optionC}
            onChange={handleInputChange}
            className='py-2'
            style={{
              border: '1px solid #6063af',
              backgroundColor: 'transparent',
              borderRadius: '5px',
              width: '100%',
              fontSize: '15px',
              color: 'white',
            }}
          />
        </div>

        <div className='text-white col-6 p-2'>
          <p className='mb-2' style={{ fontSize: '17px' }}>Option D</p>
          <input
            type="text"
            name="optionD"
            value={quizData.optionD}
            onChange={handleInputChange}
            className='py-2'
            style={{
              border: '1px solid #6063af',
              backgroundColor: 'transparent',
              borderRadius: '5px',
              width: '100%',
              fontSize: '15px',
              color: 'white',
            }}
          />
        </div>

        <div className='text-white col-6 p-2'>
          <p className='mb-2' style={{ fontSize: '17px' }}>Correct Answer</p>
          <select
            name="correctAnswer"
            value={quizData.correctAnswer}
            onChange={handleInputChange}
            className='py-2'
            style={{
              border: '1px solid #6063af',
              backgroundColor: 'transparent',
              borderRadius: '5px',
              width: '100%',
              fontSize: '15px',
              color: 'white',
            }}
          >
            <option value="">Select Correct Answer</option>
            <option value="optionA">A</option>
            <option value="optionB">B</option>
            <option value="optionC">C</option>
            <option value="optionD">D</option>
          </select>
        </div>

        <div className='text-white col-12 mt-2'>
          <button
            type="button"
            style={{ backgroundColor: '#404380' }}
            className="btn text-white px-5 waves-effect waves-light text-center d-flex justify-content-start mt-3"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
