import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../redux/slice/usersSlice';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import calcDis from 'calculate-discount-hojiakbar';
import { TiStarFullOutline } from 'react-icons/ti';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { HiMiniXMark } from 'react-icons/hi2';
import { CiStar } from 'react-icons/ci';
import { PiGiftThin } from 'react-icons/pi';

function Like() {
  const users = useSelector(state => state.users.users);
  const [likeitem, setlikeitem] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const [starRatings, setStarRatings] = useState({});

  useEffect(() => {
      const storedRatings = JSON.parse(localStorage.getItem('starRatings'));
      if (storedRatings) {
          setStarRatings(storedRatings);
      }
  }, []);

  const handleStarClick = (id, index) => {
      const updatedRatings = { ...starRatings, [id]: index + 1 };
      setStarRatings(updatedRatings);
      localStorage.setItem('starRatings', JSON.stringify(updatedRatings));
  };


  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('likeitem')) || [];
    setlikeitem(storedItems);
  }, []);

  return (
    <div className='likecontainer'>
      <h2 style={{ fontSize: "30px" }}>Нравиться</h2>
      {likeitem.length > 0 ? (
        <>
          <div className='basketcardparent2'>
            {likeitem.map(user => (
              <NavLink to={`/${user.id}`} key={user.id}>
                <div className="catalogcartcontainer">
                  <img className='catalogimg' src={user.img} alt="" />
                  <div className='apsalutcatalog'>
                    <div className='nalichne_sale'>
                      <div className="nalichne">
                        {user.status ?
                          <div style={{ color: "#454F5B", display: "flex", alignItems: "center", gap: "4px" }}><IoCheckmarkOutline style={{ color: "#24C56E" }} />В наличии</div>
                          :
                          <div style={{ color: "#454F5B", display: "flex", alignItems: "center", gap: "4px" }}><HiMiniXMark style={{ color: "#E44286" }} />Нет в наличии</div>
                        }
                      </div>
                      <div className="sale">SALE</div>
                    </div>
                    <div style={{ color: "#454F5B", display: "flex", alignItems: "center", gap: "4px" }} className="podarka"><PiGiftThin style={{ color: "#4295E4", fontSize: "20px" }} />Подарок</div>
                  </div>
                  <div className='catalog_card_name'>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <div style={{ display: "flex", fontSize: "20px" }}>
                        {[...Array(5)].map((_, index) => (
                          <span key={index} onClick={() => handleStarClick(user.id, index)}>
                            {index < starRatings[user.id] ? <TiStarFullOutline style={{ color: "#F6AB3A" }} /> : <CiStar style={{ color: "#C4CDD5" }} />}
                          </span>
                        ))}
                      </div>
                      <p style={{ color: "#4295E4" }}>(12) отзывов</p>
                    </div>
                    <div style={{ color: "#454F5B" }}>{user.name.length > 0 ? user.name.slice(0, 50) + "..." : user.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <h1 style={{ fontSize: '20px', color: "#161C24" }}>{Math.round(calcDis(user.price, user.discount))}₽ </h1><del style={{ color: "#454F5B" }}>{Math.round(user.price)}₽</del>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "red", textAlign: "center", marginTop: "100px", fontSize: "25px" }}>Желаемый товар не найден</p>
          <div>
            <NavLink to={"/katalog"}><button className='buttonkatalog1'>Каталог</button></NavLink>
            <NavLink to={"/"}><button className='buttonkatalog1'>Главная</button></NavLink>
          </div>
        </div>
      )}
    </div>

  );
}

export default Like;
