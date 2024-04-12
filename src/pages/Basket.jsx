import React, { useEffect, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

function Basket() {
  const [basketItems, setBasketItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('basketItems')) || [];
    setBasketItems(storedItems);
    calculateTotalPrice(storedItems);
  }, []);

  const calculateTotalPrice = (items) => {
    let total = 0;
    items.forEach(item => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedItems = basketItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: parseInt(quantity) };
      }
      return item;
    });
    setBasketItems(updatedItems);
    localStorage.setItem('basketItems', JSON.stringify(updatedItems));
    calculateTotalPrice(updatedItems);
  };

  const handleIncrement = (id) => {
    const updatedItems = basketItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setBasketItems(updatedItems);
    localStorage.setItem('basketItems', JSON.stringify(updatedItems));
    calculateTotalPrice(updatedItems);
  };

  const handleDecrement = (id) => {
    const updatedItems = basketItems.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setBasketItems(updatedItems);
    localStorage.setItem('basketItems', JSON.stringify(updatedItems));
    calculateTotalPrice(updatedItems);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedItems = basketItems.filter(item => item.id !== id);
        setBasketItems(updatedItems);
        localStorage.setItem('basketItems', JSON.stringify(updatedItems));
        calculateTotalPrice(updatedItems);
        let timerInterval;
        Swal.fire({
          title: "Auto close alert!",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });

      }
    });
  };


  return (
    <div className='basketcontainer'>
      <h2 style={{ fontSize: "30px" }}>Корзина</h2>
      {basketItems.length > 0 ? (
        <>
          <ul className='basketcardparent'>
            {basketItems.map(item => (
              <div className='basketcard' key={item.id}>
                <div className='basketcard_flex'>
                  <img className='imgbasket' src={item.img} alt="" />
                  <div className='basketnamevscaunt'>
                    <p>{item.name.length > 0 ? item.name.slice(0, 35) + "..." : item.name}</p>
                    <div className='caunter'>
                      <div className='caunterlar' onClick={() => handleDecrement(item.id)}>-</div>
                      <input style={{ width: "50px", padding: "4px 5px", outline: "none", border: "1px solid #EAEAEA" }} type="number" min="1" value={item.quantity} onChange={(e) => handleQuantityChange(item.id, e.target.value)} />
                      <div className='caunterlar' onClick={() => handleIncrement(item.id)}>+</div>
                    </div>
                  </div>
                </div>
                <div className='basketdeleteprice'>
                  <div onClick={() => handleDelete(item.id)} className='udalete' style={{ color: "#4295E4", display: "flex", alignItems: "center", cursor: "pointer" }}><MdDeleteOutline style={{ fontSize: "25px" }} />Удалить</div>
                  <div style={{ fontSize: "22px" }}>{item.price.toLocaleString()} ₽</div>
                </div>
              </div>
            ))}
          </ul>
          <div className='basketbutton2'>
            <div className='itagobasket'>Итого: {totalPrice.toLocaleString()} ₽</div>
            <div className='basketbutton'>
              <button className='buttonbasket1'>Оформить заказ</button>
              <NavLink to={"/katalog"}><button className='buttonbasket2'>Продолжить покупки</button></NavLink>
            </div>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "red", textAlign: "center", marginTop: "100px", fontSize: "25px" }}>На данный момент в корзине нет товаров</p>
          <div>
            <NavLink to={"/katalog"}><button className='buttonkatalog1'>Каталог</button></NavLink>
            <NavLink to={"/"}><button className='buttonkatalog1'>Главная</button></NavLink>
          </div>
        </div>
      )}
    </div>

  );
}

export default Basket;
