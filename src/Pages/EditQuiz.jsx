import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuizById, updateQuiz } from '../Conf/Api';

export const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  

  const [quizData, setQuizData] = useState({
    question: "",
    A: "",
    B: "",
    C: "",
    D: "",
    answer: "",
    categoryId: "",
  });
console.log(quizData);

  const [loading, setLoading] = useState(true);  // State to track loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quiz = await fetchQuizById(id);
        console.log(quiz.data);
          setQuizData(quiz.data)
       
        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setLoading(false);  // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, [id]);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission to update the quiz
  const handleUpdate = async () => {
    try {
      const updatedQuiz = {
        question: quizData.question,
        A: quizData.A,
        B: quizData.B,
        C: quizData.C,
        D: quizData.D,
        answer: quizData.answer,
        categoryId: quizData.categoryId,
      };

      // Call the update API
      await updateQuiz(id, updatedQuiz);

      alert("Quiz updated successfully!");
      navigate('/quiz'); // Redirect to the quiz list page after update
    } catch (error) {
      console.error('Error updating quiz:', error);
      alert('Failed to update the quiz.');
    }
  };

  // Render a loading spinner or message if data is still being fetched
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner component
  }

  return (
    <div className="p-4">
      <div className="col-12 p-4" style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
        <h3>Edit Quiz</h3>

        {/* Quiz Form */}
        <div className="mb-3">
          <label className="mb-2">Question</label>
          <input
            type="text"
            name="question"
            value={quizData.question}
            onChange={handleInputChange}
            className="form-control" style={{ backgroundColor: 'transparent', color: 'white' }}
          />
        </div>

        <div className="mb-3">
          <label className="mb-2">Option A</label>
          <input
            type="text"
            name="A"
            value={quizData.A}
            onChange={handleInputChange}
            className="form-control" style={{ backgroundColor: 'transparent', color: 'white' }}
          />
        </div>

        <div className="mb-3">
          <label className="mb-2">Option B</label>
          <input
            type="text"
            name="B"
            value={quizData.B}
            onChange={handleInputChange}
            className="form-control" style={{ backgroundColor: 'transparent', color: 'white' }}
          />
        </div>

        <div className="mb-3">
          <label className="mb-2">Option C</label>
          <input
            type="text"
            name="C"
            value={quizData.C}
            onChange={handleInputChange}
            className="form-control" style={{ backgroundColor: 'transparent', color: 'white' }}
          />
        </div>

        <div className="mb-3">
          <label className="mb-2">Option D</label>
          <input
            type="text"
            name="D"
            value={quizData.D}
            onChange={handleInputChange}
            className="form-control" style={{ backgroundColor: 'transparent', color: 'white' }}
          />
        </div>

        <div className="mb-3">
          <label className="mb-2">Correct Answer</label>
          <select
            name="answer"
            value={quizData.answer}
            onChange={handleInputChange}
            className="form-control" style={{ backgroundColor: 'transparent', color: 'white' }}
          >
            <option value="A" style={{ backgroundColor: '#191a32', color: 'white' }}>Option A</option>
            <option value="B" style={{ backgroundColor: '#191a32', color: 'white' }}>Option B</option>
            <option value="C" style={{ backgroundColor: '#191a32', color: 'white' }}>Option C</option>
            <option value="D" style={{ backgroundColor: '#191a32', color: 'white' }}>Option D</option>
          </select>
        </div>

        <button className="btn btn-primary" onClick={handleUpdate}>Update Quiz</button>
      </div>
    </div>
  );
};
