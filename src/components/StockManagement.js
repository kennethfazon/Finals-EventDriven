import React, { useState, useEffect } from 'react';
import {Button, Modal, Table, Alert} from 'react-bootstrap';


const StockManagement = ({ products, Input, setProducts }) => {
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState('');
  const [showAlert, setShowAlert] = useState(false);
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


  const handleClose = () => {
    setShow(false);
    setSelectedProduct(null);
    setNewStock('');
  };

  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const handleSaveChanges = () => {
    if (newStock.trim() === '') {
      setShowAlert({
        variant: "danger",
        message: "Field are required",
      });
      return;
    }

    if (selectedProduct) {
      const updatedProducts = products.map((product) =>
        product.id === selectedProduct.id
          ? { ...product, stock: parseInt(newStock, 10) }
          : product
      );
  
      setProducts(updatedProducts);
      handleClose();
    }
  };
  


  return (
    <>
      <div className="container d-flex justify-content-center">
        <Table striped bordered className="table table-responsive text-center">
          <thead>
            <tr>
              <th scope="col" className="bg-primary text-white">
                Product ID
              </th>
              <th scope="col" className="bg-primary text-white">
                Name
              </th>
              <th scope="col" className="bg-primary text-white">
                Stock
              </th>
              <th scope="col" className="bg-primary text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.stock}</td>
                <td>
                  <Button variant="success" onClick={() => handleShow(product)}>
                    Update Stock
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Stock</Modal.Title>
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
        
          <label htmlFor="stockInput">Update Stock:</label>
          <input
            type="number"
            id="stockInput"
            style={Input}
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
          />
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StockManagement;
