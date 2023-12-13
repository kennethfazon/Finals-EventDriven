
import React, { useState} from "react";
// components

import CardLineChart from "./components/CardLineChart";
import CardBarChart from "./components/CardBarChart";
import ProductManagement from "./components/ProductManagement";
import CategoryManagement from "./components/CategoryManagement";
export default function Home({ products, setProducts, transactionData, cart, setCart, selectedProducts, setSelectedProducts }) {
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: 1,
    name: "",
    price: "",
    stock: "",
    category: "",
  });
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart 
          products={products}/>
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart 
          transactionData= {transactionData}
          />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <ProductManagement
          products={products}
          setProducts={setProducts}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          categories={categories}
          cart={cart}
          setCart={setCart}
          setSelectedProducts={setSelectedProducts}
          selectedProducts={selectedProducts}
          />
        </div>
        <div className="w-full xl:w-4/12 px-4">
        <CategoryManagement categories={categories} setCategories={setCategories} />
        </div>
      </div>
    </>
  );
}
// import React, { useState, useEffect } from "react";
// import { Button, Modal, Form, Alert } from "react-bootstrap";
// import CategoryManagement from "./components/CategoryManagement";

// const Home = ({ products, setProducts }) => {

//   const [categories, setCategories] = useState([]);
//   const [show, setShow] = useState(false);
//   const [newProduct, setNewProduct] = useState({
//     id: 1,
//     name: "",
//     price: "",
//     stock: "",
//     category: "",
//   });
//   const [editIndex, setEditIndex] = useState(-1);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [newCategory, setNewCategory] = useState("");
//   const [editCategory, setEditCategory] = useState("");
//   const [isLoading, setLoading] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
  
//   useEffect(() => {
//     function simulateNetworkRequest() {
//       return new Promise((resolve) => setTimeout(resolve, 2000));
//     }
//     if (isLoading) {
//       simulateNetworkRequest().then(() => {
//         setLoading(false);
//         setShowAlert(true);
//       });
//     }
//   }, [isLoading]);

//   useEffect(() => {
//     let alertTimeout;

//     if (showAlert) {
//       alertTimeout = setTimeout(() => {
//         setShowAlert(false);
//       }, 2000);
//     }

//     return () => {
//       clearTimeout(alertTimeout);
//     };
//   }, [showAlert]);

 
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setNewProduct((prevProduct) => ({
//       ...prevProduct,
//       image: file,
//     }));
  
//   };

//   const addProduct = (event) => {
//     event.preventDefault();
  
//     if (
//       newProduct.name.trim() === "" ||
//       newProduct.price.trim() === "" ||
//       newProduct.stock.trim() === "" ||
//       newProduct.category.trim() === "" ||
//       !newProduct.image
      
//     ) {
//       // Show an alert for required fields
//       setShowAlert({
//         variant: "danger",
//         message: "All fields are required",
//       });
//       return;
//     }
  
//     // Check if the product with the same name already exists
//     const isProductExists = products.some(
//       (product) => product.name === newProduct.name
//     );
  
//     if (isProductExists) {
//       // Show an alert that the product is already added
//       setShowAlert({
//         variant: "danger",
//         message: "Product already exists",
//       });
//     } else {
//       setLoading(true);
//       const fileInput = document.getElementById("fileInput");
//       if (fileInput) {
//         fileInput.value = "";
//       }
  
//       // Add a delay before resetting loading and showing success message
//       setTimeout(() => {
//         setProducts([...products, newProduct]);
//         setSelectedCategory("");
//         setNewProduct((prevProduct) => ({
//           id: prevProduct.id + 1,
//           name: "",
//           price: "",
//           stock: "",
//           category: "",
          
         
//         }));
  
//         // Reset loading and show success alert after 2 seconds
//         setLoading(false);
        
//       }, 2000);
//       setShowAlert({
//         variant: "success",
//         message: "Successfully added!",
//       });
//     }
//   };
  
//   const editProductHandler = (index) => {
//     setEditIndex(index);
//     setNewProduct(products[index]);
//     setShow(true)
//   };
//   const updateProduct = () => {
//     if (newProduct.name.trim() !== "" && newProduct.price.trim() !== "" && newProduct.stock.trim() !== "" && newProduct.category.trim() !== "" ) {
//       const updatedProducts = [...products];
//       updatedProducts[editIndex] = newProduct;
//       setProducts(updatedProducts);
//       setSelectedCategory('')
//       setLoading(true)
//       setEditIndex(-1);
//       setShow(false)
//       const maxId = Math.max(...products.map(product => product.id));

//     setNewProduct ({
//         id: maxId + 1,
//         name: "",
//         price: "",
//         stock: "",
//         category: "",
//     });
//     }
//   };

//   const deleteProduct = (index) => {

//     const updatedProducts = [...products];
//     updatedProducts.splice(index, 1);
//     setProducts(updatedProducts);
//   };

//   const addCategory = () => {
//     if (newCategory.trim() !== "") {
//       setCategories([...categories, newCategory]);
//       setNewCategory("");
//     }
//   };

//   const editCategoryHandler = (index, category) => {
//     setEditIndex(index);
//     setEditCategory(category);
//   };

//   const updateCategory = () => {
//     if (editCategory.trim() !== "") {
//       const updatedCategories = [...categories];
//       updatedCategories[editIndex] = editCategory;
//       setCategories(updatedCategories);
//       setEditIndex(-1);
//       setEditCategory("");
//     }
//   };

//   const deleteCategory = (index) => {
//     const updatedCategories = [...categories];
//     updatedCategories.splice(index, 1);
//     setCategories(updatedCategories);
//   };

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//     setNewProduct({ ...newProduct, category: e.target.value });
//   };

//   const handleClose = () => {
//     setSelectedCategory('');
//     setEditIndex(-1);
//     setShow(false);
    
//     // Find the maximum ID in the existing products
//     const maxId = Math.max(...products.map(product => product.id));

//     setNewProduct((prevProduct) => ({
//         id: maxId + 1,
//         name: "",
//         price: "",
//         stock: "",
//         category: "",
//     }));
// }

//   return (
//     <>
//       <div style={container}>
//         <div class="row">
//           <div class="col-lg-4">
//             <form style={For}>
            // {showAlert && (
            //   <Alert
            //     variant={showAlert.variant}
            //     onClose={() => setShowAlert(null)}
            //     dismissible
            //   >
            //     {showAlert.message}
            //   </Alert>
            // )}
              
//               <h3>Product Management</h3>
//               <label for="prodid"><b>Product ID </b></label>
//               <input type="text" value={newProduct.id}
//                 onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })} required style={Input} disabled />
//               <label for="prodname"><b>Product Name </b></label>
//               <input id="product" type="text" value={newProduct.name}
//                 onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} style={Input} required />
//               <label for="sellprice"><b>Price </b></label>
//               <input type="number"
                // value={newProduct.price}
                // onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required style={Input}  />
//               <label for="prodname"><b>Stock </b></label>
//               <input type="number"
                // value={newProduct.stock}
                // onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} style={Input} required />
//               <label for="prodcategory"><b>Cetegory</b></label>
              // <select value={selectedCategory} onChange={handleCategoryChange} style={Input} required>
              //   <option value="" selected disabled>Select Category</option>
              //   {categories.map((category, index) => (
              //     <option key={index} value={category}>
              //       {category}
              //     </option>
              //   ))}
              // </select>
//               <label htmlFor="prodimage"><b>Product Image</b></label>
              // <input
              //   type="file"
              //   accept="image/*"
              //   onChange={(e) => handleImageChange(e)}
              //   style={Input}
              //   id="fileInput"
              // />
//               <button className="bg-primary btn-m" disabled={isLoading} onClick={(e) => addProduct(e)} style={Btn}>{isLoading ? 'Adding…' : 'Add Product'}</button>
//             </form>
//           </div>

//           <div class="col-lg-5">
//             <table class="table table-responsive " style={Margin}>
//               <thead class='text-center'>
//                 <tr>
//                   <th scope="col" class="bg-primary text-white">Product ID</th>
//                   <th scope="col" class="bg-primary text-white">Name</th>
//                   <th scope="col" class="bg-primary text-white">Price</th>
//                   <th scope="col" class="bg-primary text-white">Stock</th>
//                   <th scope="col" class="bg-primary text-white">Category</th>
//                   <th scope="col" class="bg-primary text-white">Action</th>

//                 </tr>
//               </thead>
//               <tbody id="tbodyproducts" class='text-center'>
//                 {products.map((product, index) => (

//                   <tr key={index}>
//                     <td>{product.id}</td>
//                     <td>{product.name}</td>
//                     <td>₱{product.price} </td>
//                     <td>{product.stock}</td>
//                     <td>{product.category}</td>                    
//                     <td>
//                     <Button onClick={() => editProductHandler(index)} variant="primary">Update</Button>
//                     <Button onClick={() => deleteProduct(index)} variant="danger">Delete</Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <CategoryManagement
//             Margin={Margin}
//             newCategory={newCategory}
//             setNewCategory={setNewCategory}
//             Button={Button}
//             addCategory={addCategory}
//             categories={categories}
//             editIndex={editIndex}
//             editCategory={editCategory}
//             setEditCategory={setEditCategory}
//             editCategoryHandler={editCategoryHandler}
//             deleteCategory={deleteCategory}
//             updateCategory={updateCategory}
//           />
//         </div>
//       </div>
      // <Modal show={show} onHide={handleClose}>
      //   <Modal.Header closeButton>
      //     <Modal.Title>Edit Product</Modal.Title>
      //   </Modal.Header>
      //   <Modal.Body>
      //     {products.map((product, index) => (
      //       <Form key={index}>
      //         {editIndex === index ? (
      //           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      //             <Form.Label>ID</Form.Label>
      //             <Form.Control
      //               className="p-2"
      //               type="text"
      //               value={newProduct.id}
      //               onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
      //               autoFocus
      //               disabled
      //             />
      //             <Form.Label>Product Name</Form.Label>
      //             <Form.Control
      //               className="p-2"
      //               type="text"
      //               value={newProduct.name}
      //               onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      //               autoFocus
      //             />
      //             <Form.Label>Price</Form.Label>
      //             <Form.Control
      //               className="p-2"
      //               type="text"
      //               value={newProduct.price}
      //               onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      //               autoFocus
      //             />
      //             <Form.Label>Stock</Form.Label>
      //             <Form.Control
      //               className="p-2"
      //               type="text"
      //               value={newProduct.stock}
      //               onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
      //               autoFocus
      //             />
      //             <Form.Label>Category</Form.Label><br />
      //             <select value={selectedCategory} onChange={handleCategoryChange} className="p-2" style={Input}>
      //               <option value="">Select Category</option>
      //               {categories.map((category, index) => (
      //                 <option key={index} value={category}>
      //                   {category}
      //                 </option>
      //               ))}
      //             </select>
      //           </Form.Group>
      //         ) : (
      //           <div>
      //           </div>
      //         )}
      //       </Form>
      //     ))}
      //   </Modal.Body>
      //   <Modal.Footer>
      //     <Button variant="secondary" onClick={handleClose}>
      //       Close
      //     </Button>
      //     <Button variant="primary" onClick={updateProduct}>
      //       Save Changes
      //     </Button>
      //   </Modal.Footer>
      // </Modal>

//     </>
//   );
// }
// const For = {
//   padding: "20px",
//   width: "100%",
//   background: 'white'
// }
// const container = {
//   boxSizing: "borderBox",
//   fontFamily: "Poppins, sans-serif",
//   backgroundColor: "#f7f7f7"
// }
// const Input = {
//   width: "100%",
//   padding: "10px",
//   margin: "5px 0 22px 0",
//   display: "inlineBlock",
//   border: "none",
//   background: "#f7f7f7",
//   fontFamily: "Montserrat,Arial, Helvetica, sans-serif"
// }
// const Btn = {
//   backgroundColor: "#0eb7f4",
//   color: "white",
//   padding: "14px 20px",
//   margin: "8px 0",
//   border: "none",
//   cursor: "pointer",
//   width: "100%",
//   opacity: "0.9",
//   fontSize: "16px",
//   fontFamily: "Montserrat,Arial, Helvetica, sansSerif",
//   borderRadius: '10px'
// }
// const Margin = { marginTop: '20px' }
// export default Home;