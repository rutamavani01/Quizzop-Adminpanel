import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../Conf/Api';

function Viewcategory() {
  const [categories, setCategories] = useState([]);
  const BASE_URL = 'http://192.168.1.10:8000';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // Extract just the filename from the full path
    const filename = imagePath.split('\\').pop();
    return `${BASE_URL}/uploads/${filename}`;
  };

  return (
    <table
      className="table mt-5 text-center"
      style={{
        backgroundColor: 'rgb(25, 26, 50)',
        color: 'white',
        width: '100%',
        borderRadius: '5px',
      }}
    >
      <thead style={{ backgroundColor: 'transparent' }}>
        <tr>
          <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>ID</th>
          <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Category</th>
          <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Description</th>
          <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Image</th>
          <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <tr key={index}>
              <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                {category.id}
              </td>
              <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                {category.title}
              </td>
              <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                {category.description || 'No description available'}
              </td>
              <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                {category.image ? (
                  <img
                    src={getImageUrl(category.image)}
                    alt={category.title}
                    width="50px"
                    height="50px"
                    style={{ objectFit: 'cover', marginRight: '10px', borderRadius: '4px' }}
                  />
                ) : (
                  <span>No image available</span>
                )}
              </td>
              <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                <Link
                  to={`/edit-category/${category.id}`}
                  className="text-success me-3 fs-5"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>

                <button
                  onClick={() => {
                    const updatedCategories = categories.filter((_, i) => i !== index);
                    setCategories(updatedCategories);
                  }}
                  className="text-danger fs-5"
                  style={{ border: 'none', background: 'transparent' }}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ backgroundColor: 'transparent', textAlign: 'center', color: 'white', padding: '20px' }}>
              No categories found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Viewcategory;