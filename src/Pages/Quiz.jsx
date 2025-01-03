import React, { useState, useEffect } from 'react';
import ViewQuiz from './ViewQuiz';
import { addQuiz, getCategoriesDrodown } from '../Conf/Api';
function Quiz() {
  const [categories, setCategories] = useState([]);
  const [quizData, setQuizData] = useState({
    categoryId: "", // Store categoryId instead of categoryName
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });


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

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value; // Get the category ID
    setQuizData((prev) => ({
      ...prev,
      categoryId: selectedId, // Update categoryId in quizData
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!quizData.categoryId) {
      alert("Please select a category");
      return;
    }
    const apiData = {
      question: quizData.question,
      A: quizData.optionA,
      B: quizData.optionB,
      C: quizData.optionC,
      D: quizData.optionD,
      answer: quizData.correctAnswer,
      categoryId: quizData.categoryId,
    };

    try {
      await addQuiz(apiData);
      alert("Quiz added successfully!");
      setQuizData({
        categoryId: "",
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
      });
    } catch (error) {
      alert("Failed to add quiz. Please try again.");
    }
  };

  return (
    <div className='p-4'>
      <div className='col-12 p-4 d-flex flex-wrap' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
        <div className='text-white col-6 p-2'>
          <p className='mb-2' style={{ fontSize: '17px' }}>Category Name</p>
          <select
            name="categoryId"
            value={quizData.categoryId}
            onChange={handleCategoryChange}
            className="p-2"
            style={{
              border: '1px solid #6063af',
              backgroundColor: 'transparent',
              borderRadius: '5px',
              width: '100%',
              fontSize: '15px',
              color: 'white',
            }}
          >
            <option value="" style={{ backgroundColor: '#191a32', color: 'white' }}>
              Select Category
            </option>
            {Array.isArray(categories) &&
              categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id} // Use category ID as value
                  style={{ backgroundColor: '#191a32', color: 'white' }}
                >
                  {category.title} {/* Display the title */}
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
            className='p-2'
            style={{
              border: '1px solid #6063af',
              backgroundColor: 'transparent',
              borderRadius: '5px',
              width: '100%',
              fontSize: '15px',
              color: 'white',
            }}
          >
            <option value="" style={{ backgroundColor: '#191a32 ', color: 'white' }}>Select Correct Answer</option>
            <option value="A" style={{ backgroundColor: '#191a32 ', color: 'white' }}>A</option>
            <option value="B" style={{ backgroundColor: '#191a32 ', color: 'white' }}>B</option>
            <option value="C" style={{ backgroundColor: '#191a32 ', color: 'white' }}>C</option>
            <option value="D" style={{ backgroundColor: '#191a32 ', color: 'white' }}>D</option>
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
      {/* <ViewQuiz /> */}
    </div>
  );
}

export default Quiz;
