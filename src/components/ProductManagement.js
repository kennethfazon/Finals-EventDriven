
import { Button, Modal, Form, Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
export default function ProductManagement({ Input, products, setProducts, newProduct, setNewProduct, categories, cart, setCart, setSelectedProducts, selectedProducts }) {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editIndex, setEditIndex] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState("");

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


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      image: file,
    }));

  };

  const addProduct = (event) => {
    event.preventDefault();

    if (
      newProduct.name.trim() === "" ||
      newProduct.price.trim() === "" ||
      newProduct.stock.trim() === "" ||
      newProduct.category.trim() === "" ||
      !newProduct.image

    ) {
      // Show an alert for required fields
      setShowAlert({
        variant: "danger",
        message: "All fields are required",
      });
      return;
    }

    // Check if the product with the same name already exists
    const isProductExists = products.some(
      (product) => product.name === newProduct.name
    );

    if (isProductExists) {
      // Show an alert that the product is already added
      setShowAlert({
        variant: "danger",
        message: "Product already exists",
      });
    } else {
      setLoading(true);
      const fileInput = document.getElementById("fileInput");
      if (fileInput) {
        fileInput.value = "";
      }

      // Add a delay before resetting loading and showing success message
      setTimeout(() => {
        setProducts([...products, newProduct]);
        setSelectedCategory("");
        setNewProduct((prevProduct) => ({
          id: prevProduct.id + 1,
          name: "",
          price: "",
          stock: "",
          category: "",


        }));

        // Reset loading and show success alert after 2 seconds
        setLoading(false);
        setShow(false)

      }, 2000);
      setShowAlert({
        variant: "success",
        message: "Successfully added!",
      });
    }

  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setNewProduct({ ...newProduct, category: e.target.value });
  };

  const editProductHandler = (index) => {
    setEditIndex(index);
    setNewProduct(products[index]);
    setOpen(true)
  };
  const deleteProduct = (index) => {
    // Create copies of the products, cart, and selectedProducts arrays
    const updatedProducts = [...products];
    const updatedCart = [...cart];
    const updatedSelectedProducts = [...selectedProducts];

    // Remove the product from the products array
    const deletedProduct = updatedProducts.splice(index, 1)[0];

    
    const cartIndex = updatedCart.findIndex(product => product.id === deletedProduct.id);
    if (cartIndex !== -1) {
      updatedCart.splice(cartIndex, 1);
    }

    // Remove the product from the selectedProducts array, if it exists
    const selectedProductIndex = updatedSelectedProducts.indexOf(deletedProduct.id);
    if (selectedProductIndex !== -1) {
      updatedSelectedProducts.splice(selectedProductIndex, 1);
    }

    // Update the state with the modified arrays
    setProducts(updatedProducts);
    setCart(updatedCart);
    setSelectedProducts(updatedSelectedProducts);
  };



  const Close = () => {
    setSelectedCategory('');
    setEditIndex(-1);
    setOpen(false);

    // Find the maximum ID in the existing products
    const maxId = Math.max(...products.map(product => product.id));

    setNewProduct((prevProduct) => ({
      id: maxId + 1,
      name: "",
      price: "",
      stock: "",
      category: "",
    }));
  }
  const updateProduct = () => {
    if (
      newProduct.name.trim() === "" ||
      newProduct.price.trim() === "" ||
      newProduct.category.trim() === ""
    ) {
      // Show an alert for required fields
      setShowAlert({
        variant: "danger",
        message: "All fields are required",
      });
      return;
    }

    const isProductExists = products.some(
      (product, index) =>
        index !== editIndex && product.name === newProduct.name
    );

    if (isProductExists) {
      // Show an alert that the product name already exists
      setShowAlert({
        variant: "danger",
        message: "Product name already exists",
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        const updatedProducts = [...products];
        if (editIndex !== -1) {
          // Editing an existing product
          updatedProducts[editIndex] = newProduct;
        } else {
          // Adding a new product
          updatedProducts.push(newProduct);
        }

        setProducts(updatedProducts);
        setSelectedCategory('');
        setLoading(false);
        setEditIndex(-1);
        setOpen(false);

        const maxId = Math.max(...updatedProducts.map((product) => product.id));

        setNewProduct({
          id: maxId + 1,
          name: "",
          price: "",
          stock: "",
          category: "",
        });




      }, 2000);
      setShowAlert({
        variant: "success",
        message: editIndex !== -1 ? "Successfully edited!" : "Successfully added!",
      });
    }
  };

  const handleInputChange = (fieldName, value) => {
    const isValidInput = /^0$|^[1-9]\d*$/.test(value) || value === '';
    if (isValidInput) {
      setNewProduct({ ...newProduct, [fieldName]: value });
    }
  };


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Product Management
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleShow}>
                Add Product
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse text-cente">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Product name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Price
                </th>

                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Category
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Stock
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {product.name}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {product.price}
                  </td>


                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {product.category}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {product.stock}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <Button onClick={() => editProductHandler(index)} variant="primary">Update</Button>
                    <Button onClick={() => deleteProduct(index)} variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
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
          <Form>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID</Form.Label>
              <Form.Control
                className="p-2"
                type="text"
                value={newProduct.id}
                onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })} required
                autoFocus
                disabled
              />
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                className="p-2"
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required
                autoFocus
              />
              <Form.Label>Price</Form.Label>
              <Form.Control
                className="p-2"
                type="number"
                value={newProduct.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                required
                autoFocus
              />
              {newProduct.price && /^0[1-9]/.test(newProduct.price) && (
                <div style={{ color: 'red' }}>First digit of price must be 0 or greater than 0</div>
              )}

              <Form.Label>Stock</Form.Label>
              <Form.Control
                className="p-2"
                type="number"
                value={newProduct.stock}
                onChange={(e) => {
                  const newStock = e.target.value;
                  if (/^0$|^[1-9]\d*$/.test(newStock) || newStock === '') {
                    setNewProduct({ ...newProduct, stock: newStock });
                  }
                }}
                required
                autoFocus
              />
              {newProduct.stock && /^0[1-9]/.test(newProduct.stock) && (
                <div style={{ color: 'red' }}>First digit of stock must be 0 or greater than 0</div>
              )}

              <Form.Label>Category</Form.Label><br />
              <Form.Select value={selectedCategory} onChange={handleCategoryChange} style={Input} required>
                <option value="" selected disabled>Select Category</option>

                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select><br />
              <Form.Label>Product Image</Form.Label><br />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e)}
                style={Input}
                id="fileInput"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" disabled={isLoading} onClick={(e) => addProduct(e)} >{isLoading ? 'Adding…' : 'Add Product'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={open} onHide={Close}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
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
          {products.map((product, index) => (
            <Form key={index}>
              {editIndex === index ? (
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    className="p-2"
                    type="text"
                    value={newProduct.id}
                    onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
                    autoFocus
                    disabled
                    required
                  />
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    className="p-2"
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    autoFocus
                    required
                  />
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    className="p-2"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    autoFocus
                    required
                  />

                  <Form.Label>Category</Form.Label><br />
                  <Form.Select value={selectedCategory} onChange={handleCategoryChange} className="p-2">
                    <option value="" required>Select Category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              ) : (
                <div>
                </div>
              )}
            </Form>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Close}>
            Close
          </Button>
          <Button variant="primary" onClick={updateProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
