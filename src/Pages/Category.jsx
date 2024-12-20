import React, { useState } from 'react';
import { Card, Row, Col, Form, CardBody, CardTitle } from 'reactstrap';
import Dropzone from 'react-dropzone';

const Category = () => {
  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <div className='p-4'>
      <h5 className='text-white mb-3'>Category Add</h5>

      <div className='col-12 p-4' style={{ backgroundColor: '#191a32', color: 'white', width: '100%' ,borderRadius:'5px'}}>
        <div className='text-white'>
          <p className='fw-bold mb-2' style={{fontSize:'17px'}}>Category Name  </p>
          <input
            type="text" className='py-2'
            style={{
              border: '1px solid #6063af',
              backgroundColor: 'transparent',
              borderRadius: '5px',
              width: '100%', fontSize:'15px', color: 'white',
            }}
            
          />
        </div>

        {/* Image Upload Section */}
        <div className="mt-4">
          <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
            <CardBody className='p-0'>
            <CardTitle  style={{fontSize:'17px'}} className="fw-bold text-white">Category Image</CardTitle>
              <div className="mb-5 m-auto">
                <Form className='text-center text-white'>
                  <Dropzone
                    onDrop={acceptedFiles => handleAcceptedFiles(acceptedFiles)}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone" style={{ border: '2px dotted #6063af', padding: '50px',borderRadius:'5px' }}>
                        <div className="dz-message needsclick" {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div className="mb-1">
                            <i className="bi bi-cloud-arrow-up  display-4  text-white"></i>
                          </div>
                          <h4>Drop files here or click to upload.</h4>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  <div className="dropzone-previews mt-3" id="file-previews">
                    {selectedFiles.map((f, i) => (
                      <Card
                        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                        key={i + "-file"}
                        style={{ backgroundColor: 'transparent', border: 'none' }}
                      >
                        <div className="p-2">
                          <Row className="align-items-center">
                            <Col className="col-auto">
                              <img
                                data-dz-thumbnail=""
                                height="80"
                                className="avatar-sm rounded bg-light"
                                alt={f.name}
                                src={f.preview}
                              />
                            </Col>
                            <Col className='text-start'>
                              <p className="text-white font-weight-bold">{f.name}</p>
                              <p className="mb-0 text-white">
                                <strong>{f.formattedSize}</strong>
                              </p>
                            </Col>
                          </Row>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
          <button
            type="button" style={{backgroundColor:'#404380'}}
            className="btn text-white px-5 waves-effect waves-light text-center d-flex justify-content-start  mt-3"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
