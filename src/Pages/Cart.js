
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTypography
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from "react";

import { Button, Alert, Form } from "react-bootstrap";
import Swal from 'sweetalert2';
const Cart = ({ products, setProducts, cart, quantities, setQuantities, setCart, updateTransactionData, selectedProducts, setSelectedProducts}) => {

  const [isLoading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  
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

  const handleCloseAlert = () => setShowAlert(false);

  const handleIncrement = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: (prevQuantities[index] || 0) + 1,
    }));
  };

  const handleDecrement = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: Math.max((prevQuantities[index] || 0) - 1, 0),
    }));
  };

  const handleToggleProduct = (index) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
  };
  


  const totalQuantity = selectedProducts.reduce(
    (total, selectedIndex) => total + (quantities[selectedIndex] || 0),
    0
  );

  const totalAmount = selectedProducts.reduce(
    (total, selectedIndex) =>
      total + (cart[selectedIndex]?.price || 0) * (quantities[selectedIndex] || 0),
    0
  );
  
  const handleRemoveItem = (indexToRemove) => {
    const updatedSelectedProducts = selectedProducts.filter((selectedIndex) => selectedIndex !== indexToRemove);
    setSelectedProducts(updatedSelectedProducts);
  
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  
    // Also update quantities array
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[indexToRemove];
      return updatedQuantities;
    });
  };
  


 const handleBuyNow = () => {
  setLoading(true);

  let alertMessage = null;
  let updatedProducts = [...products];
  let updatedTransactionData = [];

  selectedProducts.forEach((cartIndex) => {
    const productId = cart[cartIndex].id;

    if (quantities[cartIndex] === 0) {
      alertMessage = "Please select a quantity greater than 0 for the product.";
    } else if (quantities[cartIndex] > cart[cartIndex].stock) {
      alertMessage = "Ordered quantity not available!";
    } else {
      const orderedQuantity = quantities[cartIndex] || 0;
      const updatedStock = Math.max(cart[cartIndex].stock - orderedQuantity, 0);

      updatedProducts = updatedProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              stock: updatedStock,
            }
          : product
      );

      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [cartIndex]: 0,
      }));

      updatedTransactionData.push({
        name: cart[cartIndex].name,
        category: cart[cartIndex].category,
        quantity: orderedQuantity,
        price: cart[cartIndex].price,
        total: cart[cartIndex].price * orderedQuantity,
        date: new Date().toLocaleDateString(),
      });
    }
  });

  if (alertMessage) {
    setAlertMessage(alertMessage);
    setShowAlert(true);
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Purchase Successful!',
      text: 'Thank you for your purchase. 🌟',
      timer: 2000,
      showConfirmButton: false,
    });

    const updatedCart = cart.filter((_, index) => !selectedProducts.includes(index));
    setCart(updatedCart);
    setProducts(updatedProducts);

    // Call the function from props to update TransactionReport data
    updateTransactionData(updatedTransactionData);
  }

  setSelectedProducts([]);
};


  const handleCheckboxChange = (index) => {
    // Toggle the selection
    const updatedSelectedProducts = selectedProducts.includes(index)
      ? selectedProducts.filter((selectedIndex) => selectedIndex !== index)
      : [...selectedProducts, index];

    if (!selectedProducts.includes(index)) {
      handleDecrement(index);
    }
  
    setSelectedProducts(updatedSelectedProducts);
  };
  

  return (
    <section className="h-100 gradient-custom">
      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center my-4">
          <MDBCol md="8">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                {showAlert && (
                  <Alert variant="danger" onClose={handleCloseAlert} dismissible>
                    {alertMessage}
                  </Alert>
                )}
                <MDBTypography tag="h5" className="mb-0">
                  Cart {cart.length} {cart.length > 1 ? 'Items': 'Item'}
                </MDBTypography>
              </MDBCardHeader>
              {cart.map((product, index) => (
                <MDBCardBody key={index}>
                  <MDBRow >
                    <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                      <MDBRipple rippleTag="div" rippleColor="light"
                        className="bg-image rounded hover-zoom hover-overlay">
                        {product.image && (
                          <img
                            src={URL.createObjectURL(product.image)}
                            alt={`Product ${product.name}`}
                            className="w-100"
                          />
                        )}

                        <a href="#!">
                          <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                          </div>
                        </a>
                      </MDBRipple>
                      <div className="form-check" style={{ fontSize: '20px' }}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`productCheckbox${index}`}
                          checked={selectedProducts.includes(index)}
                          onChange={() => handleCheckboxChange(index)}
                          style={{ border: '2px solid black' }}
                        />
                        <label className="form-check-label" htmlFor={`productCheckbox${index}`}>
                          Select
                        </label>
                      </div>
                    </MDBCol>
                    <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                      <p>
                        <strong style={{ fontSize: "24px" }}>{product.name}</strong>
                      </p>
                      <p>Category: {product.category}</p>
                      <p>Stock: {product.stock}</p>
                      <p>Price: {product.price}</p>
                      <Button wrapperProps={{ size: "sm" }} wrapperClass="me-1 mb-2" variant="danger"
                        title="Remove item" onClick={() => handleRemoveItem(index)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </MDBCol>
                    <MDBCol lg="4" md="2" className="mb-3">
                      <div className="d-flex mb-4">
                        <Button
                          className="h-4 me-2"
                          onClick={() => handleDecrement(index)}
                          disabled={!selectedProducts.includes(index)}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <MDBInput
                          type="number"
                          label="Quantity"
                          value={quantities[index] || 0}
                          disabled={!selectedProducts.includes(index)}
                        />
                        <Button
                          className="px-3 ms-2"
                          onClick={() => handleIncrement(index)}
                          disabled={!selectedProducts.includes(index)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </div>
                      <p className="text-start text-md-center">
                        <strong>₱{product.price * (quantities[index] || 0)}</strong>
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <hr className="my-4" />
                </MDBCardBody>
              ))}
            </MDBCard>
          </MDBCol>
          <MDBCol md="4">
            <MDBCard className="mb-4">
              <MDBCardHeader>
                <MDBTypography tag="h5" className="mb-0">
                  Summary
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBListGroup flush>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                    Total Quantity
                    <span>{totalQuantity}</span>
                  </MDBListGroupItem>
                  <MDBListGroupItem
                    className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>₱{totalAmount.toFixed(2)}</strong>
                    </span>
                  </MDBListGroupItem>
                </MDBListGroup>
                <div className="d-grid gap-2">
                  <Button
                    block
                    size="lg"
                    disabled={isLoading || selectedProducts.length === 0 || selectedProducts.some((index) => quantities[index] === 0)}
                    onClick={handleBuyNow}
                  >
                    {isLoading ? 'Loading…' : 'Buy Now'}
                  </Button>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

      </MDBContainer>
    </section>
  );
}
export default Cart;