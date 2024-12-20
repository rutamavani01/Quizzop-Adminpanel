import React from 'react';

function Viewcategory({ categories }) {
    return (
        <table
            className="table mt-5"
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
                </tr>
            </thead>
            <tbody>
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <tr key={index}>
                            <td style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>
                                {index + 1}
                            </td>
                            <td style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>
                                {category.name}
                            </td>
                            <td style={{ backgroundColor: 'transparent', color: 'white', padding: '20px' }}>
                                {category.image && category.image.base64 ? (
                                    <img
                                        src={category.image.base64}
                                        alt={category.image.name || 'Category Image'}
                                        width="100px"
                                        height="100px"
                                        style={{ objectFit: 'cover', marginRight: '10px' }}
                                    />
                                ) : (
                                    <span>No image available</span>
                                )}
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
