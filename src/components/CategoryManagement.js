import React from "react";
import { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';


export default function CategoryManagement({ categories, setCategories }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = useState(false);

  const Close = () => setOpen(false);
  const handleOpen = (index, category) => {
    setEditIndex(index);
    setEditCategory(category);
    setOpen(true);
  };


  const [editIndex, setEditIndex] = useState(-1);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
        setShowAlert(true);
      });
    }
  }, [isLoading]);

  useEffect(() => {
    let alertTimeout;

    if (showAlert) {
      alertTimeout = setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }

    return () => {
      clearTimeout(alertTimeout);
    };
  }, [showAlert]);


  const addCategory = () => {
    if (newCategory.trim() === "") {
      setShowAlert({
        variant: "danger",
        message: "Field are required",
      });
      return;
    }

    const isCategoryExists = categories.some(
      (category) => category === newCategory
    );

    if (isCategoryExists) {
      setShowAlert({
        variant: "danger",
        message: "Category already exists",
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        setCategories([...categories, newCategory]);
        setNewCategory("");
        setLoading(false);
        setShow(false);

      }, 2000);
      setShowAlert({
        variant: "success",
        message: "Successfully added!",
      });
    }
  };



  const updateCategory = () => {
    if (editCategory.trim() === "") {
      setShowAlert({
        variant: "danger",
        message: "Field are required",
      });
      return;
    }

    const isCategoryExists = categories.some(
      (category) => category === editCategory
    );

    if (isCategoryExists) {
      setShowAlert({
        variant: "danger",
        message: "Category already exists",
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        const updatedCategories = [...categories];
        updatedCategories[editIndex] = editCategory;
        setCategories(updatedCategories);
        setEditIndex(-1);
        setEditCategory("");
        setLoading(false);
        
        setOpen(false)

      }, 2000);
      setShowAlert({
        variant: "success",
        message: "Successfully Edited!",
      });

    }
  };

  const deleteCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Category Management
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleShow}>
                Add Category
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse text-cente">
            <thead className="thead-light">
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Categories
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (

                <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {category}
                  </th>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    <Button onClick={() => handleOpen(index, category)} variant="primary">Update</Button>
                    <Button onClick={() => deleteCategory(index)} variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        {showAlert && (
          <Alert
            variant={showAlert.variant}
            onClose={() => setShowAlert(null)}
            dismissible
          >
            {showAlert.message}
          </Alert>
        )}
        <Modal.Body>
          <Form.Control
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" disabled={isLoading} onClick={addCategory}>{isLoading ? 'Adding…' : 'Add Category'}</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={open} onHide={Close}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        {showAlert && (
          <Alert
            variant={showAlert.variant}
            onClose={() => setShowAlert(null)}
            dismissible
          >
            {showAlert.message}
          </Alert>
        )}
        <Modal.Body>
          <Form.Control
            type="text"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Close}>
            Close
          </Button>
          <Button variant="primary" disabled={isLoading} onClick={updateCategory}>
            {isLoading ? 'Updating…' : 'Update Category'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
