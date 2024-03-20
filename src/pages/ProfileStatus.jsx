// Basket.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../redux/slice/BasketSlice';

function ProfileStatus() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.basket.products);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId)); // Bu yerda productId undefined bo'lishi mumkin
    console.log(productId)
  };

  return (
    <div>
      <h1>ProfileStatus</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.price} // Bu yerda product.id mavjud bo'lishi kerak
            <button onClick={() => (product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileStatus;
