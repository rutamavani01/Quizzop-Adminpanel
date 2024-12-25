import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, CardBody, CardTitle } from 'reactstrap';
import Dropzone from 'react-dropzone';
import Viewcategory from './Viewcategory';
import { addCategory } from '../Conf/Api';

const Category = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleAcceptedFiles(files) {
    const file = files[0];
    if (!file) {
      alert('No file selected.');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    // Validate file size (e.g., 5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      setSelectedFile({
        name: file.name,
        preview: URL.createObjectURL(file),
        base64: base64String,
        formattedSize: formatBytes(file.size),
      });
    };
    reader.readAsDataURL(file);
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const handleSubmit = async () => {
    try {
      // Validate inputs
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

      <div
        className="col-12 p-4"
        style={{
          backgroundColor: "#191a32",
          color: "white",
          width: "100%",
          borderRadius: "5px",
        }}>
        <div className="text-white">
          <p className=" mb-2" style={{ fontSize: "17px" }}>
            Category Name
          </p>
          <input
            type="text"
            className="py-2"
            style={{
              border: "1px solid #6063af",
              backgroundColor: "transparent",
              borderRadius: "5px",
              width: "100%",
              fontSize: "15px",
              color: "white",
            }}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <div className="text-white mt-4">
          <p className=" mb-2" style={{ fontSize: "17px" }}>
            Category Description
          </p>
          <textarea
            type="text"
            className="py-2"
            style={{
              border: "1px solid #6063af",
              backgroundColor: "transparent",
              borderRadius: "5px",
              width: "100%",
              fontSize: "15px",
              color: "white",
            }}
            value={categoryDesc}
            onChange={(e) => setCategoryDesc(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <Card style={{ backgroundColor: "transparent", border: "none" }}>
            <CardBody className="p-0">
              <CardTitle style={{ fontSize: "17px" }} className=" text-white">
                Category Image
              </CardTitle>
              <div className="mb-5 m-auto">
                <Form className="text-center text-white">
                  <Dropzone onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)} maxFiles={1}>
                    {({ getRootProps, getInputProps }) => (
                      <div
                        className="dropzone"
                        style={{
                          border: "2px dotted #6063af",
                          padding: "50px",
                          borderRadius: "5px",
                        }}>
                        <div className="dz-message needsclick" {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div className="mb-1">
                            <i className="bi bi-cloud-arrow-up  display-4  text-white"></i>
                          </div>
                          <h4>Drop file here or click to upload.</h4>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  {selectedFile && (
                    <div className="dropzone-previews mt-3" id="file-previews">
                      <Card
                        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}>
                        <div className="p-2">
                          <Row className="align-items-center">
                            <Col className="col-auto">
                              <img
                                data-dz-thumbnail=""
                                height="80"
                                className="avatar-sm rounded bg-light"
                                alt={selectedFile.name}
                                src={selectedFile.preview}
                              />
                            </Col>
                            <Col className="text-start">
                              <p className="text-white font-weight-bold">{selectedFile.name}</p>
                              <p className="mb-0 text-white">
                                <strong>{selectedFile.formattedSize}</strong>
                              </p>
                            </Col>
                          </Row>
                        </div>
                      </Card>
                    </div>
                  )}
                </Form>
              </div>
            </CardBody>
          </Card>

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