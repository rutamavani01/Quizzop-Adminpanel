import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Category_edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const categories = JSON.parse(localStorage.getItem("categories")) || [];
        const categoryToEdit = categories[id];
        if (categoryToEdit) {
            setCategoryName(categoryToEdit.name);
            setSelectedFile(categoryToEdit.image); // Set image data for preview
        } else {
            alert("Category not found!");
            navigate("/");
        }
    }, [id, navigate]);

    const handleUpdate = () => {
        if (!categoryName.trim()) {
            alert("Please enter a category name.");
            return;
        }

        const categories = JSON.parse(localStorage.getItem("categories")) || [];
        categories[id] = {
            ...categories[id],
            name: categoryName,
            image: selectedFile,
        };

        localStorage.setItem("categories", JSON.stringify(categories));
        alert("Category updated successfully!");
        navigate("/category");
    };

    return (


        <div className="p-4">
            <h5 className="text-white mb-3">Edit Category</h5>

            <div className="col-12 p-4"
                style={{
                    backgroundColor: "#191a32",
                    color: "white",
                    width: "100%",
                    borderRadius: "5px",
                }}>
                <p className="fw-bold mb-2 text-white" style={{ fontSize: "17px" }}>
                    Category Name
                </p>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="form-control mb-3"
                    style={{ color: "white", backgroundColor: "rgb(25, 26, 50)" }}
                />

                <p className="fw-bold mb-2 text-white" style={{ fontSize: "17px" }}>
                    Category Image
                </p>
                {selectedFile && selectedFile.base64 ? (
                    <div className="mb-3">
                        <img
                            src={selectedFile.base64}
                            alt={selectedFile.name}
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                    </div>
                ) : (
                    <p className="text-muted">No image available</p>
                )}
                <button
                    type="button"
                    onClick={handleUpdate}
                    style={{ backgroundColor: "#404380" }}
                    className="btn text-white px-5 waves-effect waves-light text-center d-flex justify-content-start mt-3"
                >
                    Update Category
                </button>
            </div>

        </div>
    );
};

export default Category_edit;
