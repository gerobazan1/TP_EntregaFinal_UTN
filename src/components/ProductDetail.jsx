import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../firebase/firebaseConfig";
import Swal from "sweetalert2"; 
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 
import { FaCheck } from 'react-icons/fa';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(productId)
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product details:", error));
  }, [productId]);

  const handleAddToCart = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas añadir el producto ${product.name} al carrito?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, añadir',
      cancelButtonText: 'No, gracias',
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success(
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaCheck style={{ color: '#00c9ff', marginRight: '10px' }} />
            Producto añadido al carrito correctamente!
          </div>,
          {
            position: "bottom-center",
            className: 'toast-custom-add',
            icon: false, 
            progressClassName: 'Toastify__progress-bar--add'
          }
        );
      }
    });
  };

  const handleBuyNow = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas comprar el producto ${product.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, comprar',
      cancelButtonText: 'No, gracias',
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success(
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaCheck style={{ color: '#28a745', marginRight: '10px' }} />
            Producto comprado satisfactoriamente!
          </div>,
          {
            position: "bottom-center",
            className: 'toast-custom-buy',
            icon: false, 
            progressClassName: 'Toastify__progress-bar--buy'
          }
        );
      }
    });
  };

  if (!product) {
    return <div>Cargando...</div>; 
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-image">
          <img src={product.imageURL} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Precio:</strong> ${product.price}</p>

          {/* Botones */}
          <div className="buttons">
            <button className="add-to-cart" onClick={handleAddToCart}>Añadir al carrito</button>
            <button className="buy-now" onClick={handleBuyNow}>Comprar ahora</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
