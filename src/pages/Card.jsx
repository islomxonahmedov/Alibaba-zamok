import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/slice/usersSlice';
import calcDis from '../../node_modules/calculate-discount-hojiakbar/index'
import { addProduct } from '../redux/slice/BasketSlice';
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { CiGift } from "react-icons/ci";
import { IoIosPricetags } from "react-icons/io";
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';

function Card() {
    const users = useSelector(state => state.users.users);
    const status = useSelector(state => state.users.status);
    const dispatch = useDispatch();

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers());

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);

    const handleAddToBasket = (user) => {
        const productToAdd = {
            id: user.id,
            name: user.name,
            price: Math.round(calcDis(user.price, user.discount)),
            originalPrice: Math.round(user.price)
        };
        dispatch(addProduct(productToAdd));
    };


    if (status === 'loading') {
        return <h1>loading....</h1>;
    }

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        rtl: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className='cardcontainercarusel'>
            <div style={{ marginBottom: "3%" }}>
                <h1>Наши популярные продукты</h1>
            </div>
            <Slider {...settings}>
                {users.map(user => (
                    <NavLink to={`/${user.id}`}>
                        <div key={user.id} className='homecontainercaruselparent'>
                            <figure><img className='cardimg' src={user.img} alt="" /></figure>
                            <div className='cardapsalut'>{user.status ?
                                <div className='cardapsalut_flex'>
                                    <div>
                                        <div className='card_padarka'>
                                            <CiGift className='padarka' />Подарок
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "5px" }}>
                                            <FaCheck style={{ color: "#24C56E" }} /> В наличии
                                        </div>
                                    </div>
                                    <div className='card_sale'><div><IoIosPricetags className='sale_discaunt' /><div className='prise_apsalud'>{user.discount}</div></div>SALE</div>
                                </div>
                                :
                                <div className='cardapsalut_flex'>
                                    <div>
                                        <div className='card_padarka'>
                                            <CiGift className='padarka' />Подарок
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "5px" }}>
                                            <FaXmark style={{ color: "#E44286" }} /> Нет в наличии
                                        </div>
                                    </div>
                                    <div className='card_sale'><div><IoIosPricetags className='sale_discaunt' /><div className='prise_apsalud'>{user.discount}</div></div>SALE</div>
                                </div>}
                            </div>
                            <div className='card_p_padding'>
                                <p className=''>{user.name.length > 0 ? user.name.slice(0, 55) + "..." : user.name}</p>
                                <div className='price'>
                                    <h1>{Math.round(calcDis(user.price, user.discount))}₽ </h1><del>{Math.round(user.price)}₽</del>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </Slider>
        </div>
    )
}

export default Card