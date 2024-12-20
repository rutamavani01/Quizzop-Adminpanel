import React from 'react';
import { Link } from 'react-router';

function Viewcategory({ categories }) {
    const handleDelete = () => {
        console.log("delete");
        
    }
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
                    <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Image</th>
                    <th style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <tr key={index}>
                            <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                                {index + 1}
                            </td>
                            <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                                {category.name}
                            </td>
                            <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                                {category.image && category.image.base64 ? (
                                    <img
                                        src={category.image.base64}
                                        alt={category.image.name || 'Category Image'}
                                        width="50px"
                                        height="50px"
                                        style={{ objectFit: 'cover', marginRight: '10px' }}
                                    />
                                ) : (
                                    <span>No image available</span>
                                )}
                            </td>
                            <td style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                                <Link
                                    to={`/edit-category/${index}`}
                                    className="text-success me-3 fs-5"
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <Link href='' onClick={handleDelete} className='text-danger fs-5'><i class="fa-solid fa-trash"></i></Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" style={{ textAlign: 'center', color: 'white', padding: '20px' }}>
                            No categories found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Viewcategory;