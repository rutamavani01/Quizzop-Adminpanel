import React, { useState } from 'react';
import { Card, Row, Col } from 'reactstrap';
import Dropzone from 'react-dropzone';
import Viewcategory from './Viewcategory';
import { addCategory } from '../Conf/Api';

const Category = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileDrop = (acceptedFiles) => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile({
          file: file,
          base64: reader.result
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!categoryName.trim()) {
        alert('Please enter a category name.');
        return;
      }
      if (!categoryDesc.trim()) {
        alert('Please enter a category description.');
        return;
      }
      if (!selectedFile) {
        alert('Please upload a category image.');
        return;
      }

      setIsLoading(true);

      const categoryData = {
        name: categoryName,
        description: categoryDesc,
        endtime: "22:59:48",
        playcoin: 200,
        wincoin: 100,
        image: selectedFile.base64
      };

      const response = await addCategory(categoryData);

      if (response.success) {
        // Add new category to state
        setCategories(prev => [...prev, response.data]);

        // Reset form
        setCategoryName('');
        setCategoryDesc('');
        setSelectedFile(null);

        alert('Category added successfully!');
      } else {
        throw new Error(response.message || 'Failed to add category');
      }
    } catch (error) {
      alert(error.message || 'Failed to add category. Please try again.');
      console.error('Error adding category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h5 className="text-white mb-3">Category Add</h5>

      <div className="col-12 p-4" style={{ backgroundColor: "#191a32", color: "white", width: "100%", borderRadius: "5px" }}>
        <div className="text-white">
          <p className="mb-2" style={{ fontSize: "17px" }}>Category Image</p>
          <Dropzone onDrop={handleFileDrop} accept="image/*">
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} style={{
                border: "1px solid #6063af", backgroundColor: "transparent", borderRadius: "5px", width: "100%", padding: "10px", cursor: "pointer"
              }}>
                <input {...getInputProps()} />
                {selectedFile ? (
                  <div className="text-start">
                    <img
                      src={selectedFile.base64}
                      alt="Category"
                      style={{ maxWidth: "70px", height: "auto", objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <p className="text-center">Drag and drop or click to select an image</p>
                )}

              </div>
            )}
          </Dropzone>
        </div>

        <div className="text-white mt-4">
          <p className="mb-2" style={{ fontSize: "17px" }}>Category Name</p>
          <input
            type="text"
            className="py-2"
            style={{ border: "1px solid #6063af", backgroundColor: "transparent", borderRadius: "5px", width: "100%", fontSize: "15px", color: "white" }}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <div className="text-white mt-4">
          <p className="mb-2" style={{ fontSize: "17px" }}>Category Description</p>
          <textarea
            className="py-2"
            style={{ border: "1px solid #6063af", backgroundColor: "transparent", borderRadius: "5px", width: "100%", fontSize: "15px", color: "white" }}
            value={categoryDesc}
            onChange={(e) => setCategoryDesc(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <button
            type="button"
            style={{ backgroundColor: "#404380" }}
            className="btn text-white px-5 waves-effect waves-light text-center d-flex justify-content-start mt-3"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Submit'}
          </button>
        </div>
      </div>

      <Viewcategory categories={categories} setCategories={setCategories} />
    </div>
  );
};

export default Category;
