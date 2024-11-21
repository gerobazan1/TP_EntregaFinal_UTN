import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../firebase/firebaseConfig"; 
import '../styles/Home.css'; 
import '../styles/ProductCard.css'; 

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-card-image">
              <img src={product.imageURL} alt={product.name} />
            </div>
            <div className="product-card-info">
              <h3 className="product-card-title">{product.name}</h3>
              <p className="product-card-sku">{product.sku}</p>
              <p className="product-card-price">{`$${product.price}`}</p>
              <Link to={`/product/${product.id}`} className="product-card-btn-view-details">
                Ver detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
