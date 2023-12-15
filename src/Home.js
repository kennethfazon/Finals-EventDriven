import React, { useState} from "react";
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