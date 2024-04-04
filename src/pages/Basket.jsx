// Basket.jsx
import React from 'react';
import { useSelector } from 'react-redux';

function Basket() {
  const basketItems = useSelector(state => state.basket.items);

  return (
    <div>
      <h2>Basket</h2>
      <ul>
        {basketItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Basket;
