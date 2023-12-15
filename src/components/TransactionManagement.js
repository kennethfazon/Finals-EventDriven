import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Cart from '../Pages/Cart';
import Addcart from '../Pages/Addcart';
// import { Button } from 'react-bootstrap';
import React, { useState } from "react";

function TransactionManagement({products, setProducts, updateTransactionData, cart, setCart, selectedProducts, setSelectedProducts}) {
  
  const [quantities, setQuantities] = useState({});
  
  return (
    <Tabs
      defaultActiveKey="addcart"
      id="fill-tab-example"
      className="mb-3 p-3 custom-tabs"
      fill
      variant='underline'
      style={{ fontSize: "20px", fontWeight: "bold" }}
    >
      <Tab eventKey="addcart" title="Add to Cart">
        <Addcart
        setProducts = {setProducts}
        products = {products}
        cart = {cart}
        setCart = {setCart}
        quantities = {quantities}
        setQuantities={setQuantities}
        
        />
      </Tab>
      <Tab eventKey="cart" title="Cart">
        <Cart 
          setProducts = {setProducts}
          products = {products}
          cart={cart}
          setCart = {setCart}
          quantities = {quantities}
          setQuantities={setQuantities} 
          updateTransactionData = {updateTransactionData} 
          setSelectedProducts={setSelectedProducts}
          selectedProducts={selectedProducts}          
        />
      </Tab>
      
    </Tabs>
  );
}

export default TransactionManagement;
