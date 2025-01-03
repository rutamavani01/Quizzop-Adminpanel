import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getCategories } from '../Conf/Api';
import { handleDeleteCategory } from '../Conf/Api';

function Viewcategory() {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

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


  const handleDelete = async (id) => {
    try {
      const response = await handleDeleteCategory(id);
      if (response) {
        setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category.');
    }
  };

  return (
    <div className="mt-5 p-3" >
      <div className='col-12 px-4 py-2' style={{ backgroundColor: '#191a32', color: 'white', width: '100%', borderRadius: '5px' }}>
        <table className=" w-100" style={{
          backgroundColor: 'rgb(25, 26, 50) ',
          color: 'white',
          borderRadius: '5px',
        }}>
          <thead style={{ backgroundColor: 'transparent' }}>
            <tr>
              {/* <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>ID</th> */}
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
                  {/* <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>{category.id}</td> */}
                  <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                    <span
                      style={{ color: 'white', fontWeight: '500' }}
                    >
                      {category.title}
                    </span>
                  </td>
                  <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>{category.description || 'No description available'}</td>
                  <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.title}
                        style={{ maxWidth: '50px', height: 'auto', objectFit: 'cover' }}
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td style={{ backgroundColor: 'transparent', color: 'white', padding: '1px' }}>
                    <Link
                      to={`/view-categoryquiz/${category.id}`}
                      className="text-white me-3 fs-5">
                      <i className="fa-solid fa-eye"></i>
                    </Link>

                    <Link
                      to={`/edit-category/${category.id}`}
                      className="text-success me-3 fs-5" >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>

                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-danger fs-5"
                      style={{ border: 'none', background: 'transparent' }}>
                      <i className="fa-solid fa-trash"></i>
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Viewcategory;
