import React, { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Home from './Home';
import TransactionManagement from './components/TransactionManagement';
import StockManagement from "./components/StockManagement";
import TransactionReport from "./components/TransactionReport";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [transactionData, setTransactionData] = useState({
    columns: [
      {
        label: 'Product Name',
        field: 'name',
        sort: 'asc',
        width: 150,
        
      },
      {
        label: 'Category',
        field: 'category',
        sort: 'asc',
        width: 150,
        
      },
      {
        label: 'Quantity',
        field: 'quantity',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Price',
        field: 'price',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Total Price',
        field: 'total',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Purchase Date',
        field: 'date',
        sort: 'asc',
        width: 150
      },
    ],
    
    rows: [
     
    ]
  });
  const updateTransactionData = (updatedData) => {
    setTransactionData({ ...transactionData, rows: [...transactionData.rows, ...updatedData] });
  };
  return (
    <Tabs
      defaultActiveKey="products"
      id="justify-tab-example"
      className="p-3 mb-2 bg-light text-dark fs-5"
      justify
      variant='pills'
    >
      <Tab eventKey="products" title="Product Management">
        <Home
        products = {products}
        setProducts = {setProducts}
        transactionData={transactionData}
        cart={cart}
        setCart={setCart}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        />
      </Tab>
      <Tab eventKey="transaction" title="Transaction Management">
        <TransactionManagement products = {products}
        setProducts = {setProducts}
        updateTransactionData = {updateTransactionData}
        cart={cart}
        setCart={setCart}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        />
        
      </Tab>
      <Tab eventKey="Stock" title="Stock Management">
        <StockManagement
        products = {products}
        Input={Input}
        setProducts={setProducts}
        
        />
      </Tab>
      <Tab eventKey="report" title="Report">
        <TransactionReport data={transactionData}
        
        />
      </Tab>
    </Tabs>
  );
}
const Input = {
  width: "100%",
  padding: "10px",
  margin: "5px 0 22px 0",
  display: "inlineBlock",
  border: "none",
  background: "#f7f7f7",
  fontFamily: "Montserrat,Arial, Helvetica, sans-serif"
}

export default App;
