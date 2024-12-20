import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, CardBody, CardTitle } from 'reactstrap';
import Dropzone from 'react-dropzone';
import Viewcategory from './Viewcategory';

const Category = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(existingData);
  }, []);

  function handleAcceptedFiles(files) {
    const file = files[0];
    if (file) {
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
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const handleSubmit = () => {
    if (!categoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }

    if (!selectedFile) {
      alert("Please upload a category image.");
      return;
    }

    const categoryData = {
      name: categoryName,
      image: {
        name: selectedFile.name,
        base64: selectedFile.base64,
        formattedSize: selectedFile.formattedSize,
      },
    };

    // Save to localStorage and update state
    const updatedCategories = [...categories, categoryData];
    setCategories(updatedCategories); // Update state to trigger re-render
    localStorage.setItem("categories", JSON.stringify(updatedCategories));

    alert("Category added successfully!");
    setCategoryName("");
    setSelectedFile(null);
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
        }}
      >
        <div className="text-white">
          <p className="fw-bold mb-2" style={{ fontSize: "17px" }}>
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

        <div className="mt-4">
          <Card style={{ backgroundColor: "transparent", border: "none" }}>
            <CardBody className="p-0">
              <CardTitle
                style={{ fontSize: "17px" }}
                className="fw-bold text-white"
              >
                Category Image
              </CardTitle>
              <div className="mb-5 m-auto">
                <Form className="text-center text-white">
                  <Dropzone
                    onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}
                    maxFiles={1}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        className="dropzone"
                        style={{
                          border: "2px dotted #6063af",
                          padding: "50px",
                          borderRadius: "5px",
                        }}
                      >
                        <div
                          className="dz-message needsclick"
                          {...getRootProps()}
                        >
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
                    <div
                      className="dropzone-previews mt-3"
                      id="file-previews"
                    >
                      <Card
                        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
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
                              <p className="text-white font-weight-bold">
                                {selectedFile.name}
                              </p>
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
          >
            Submit
          </button>
        </div>
      </div>
      <Viewcategory categories={categories} /> {/* Pass categories to Viewcategory */}
    </div>
  );
};

export default Category;
