// Basket.js yoki boshqa qatorda
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBasketProducts, addProduct, deleteProduct } from '../redux/slice/BasketSlice';

function Basket({ product }) {
  const products = useSelector(state => state.basket.products);
  const status = useSelector(state => state.basket.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBasketProducts());
  }, [dispatch]);


  if (status === 'loading') {
    return <div>Loading...</div>;
  }



  const handleDelete = (id) => {
    dispatch(deleteProduct(product.id));
    
  };

  return (
    <div>
      <h1>Basket</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <div key={product.id} className='flex items-center gap-32 justify-center Card'>
              <img src={product.img} alt="" />
              <div>
                <div>
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                </div>
                <div>
                  <p>Цена</p>
                  <h1>{product.price}₽ </h1>
                </div>
                <button onClick={() => handleAddToBasket(product)}>Add to Basket</button>
              </div>
            </div>
            <button onClick={handleDelete}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Basket;
