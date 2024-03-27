import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/slice/usersSlice';
import calcDis from '../../node_modules/calculate-discount-hojiakbar/index'
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { CiGift } from "react-icons/ci";
import { IoIosPricetags } from "react-icons/io";
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa6";

function Card() {
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

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
                breakpoint: 1250,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const next = () => {
        document.querySelector('.cardcontainercarusel .slick-next').click();
    }
    const nextup = () => {
        document.querySelector('.cardcontainercarusel .slick-prev').click();
    }

    return (
        <div className='cardcontainercarusel'>
            <div style={{ marginBottom: "3%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px" }}>
                <h1 className='card_h1'>Наши популярные продукты</h1>
                <div className='carusel_right' style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "20px" }}>
                    <button className='right' onClick={nextup}><GoChevronLeft /></button>
                    <button className='right' onClick={next}><GoChevronRight /></button>
                </div>
            </div>
            <Slider {...settings}>
                {users.map(user => (
                    <div key={user.id} className='homecontainercaruselparent'>
                        <NavLink to={`/${user.id}`}>
                            <figure><img className='cardimg' src={user.img} alt="" /></figure>
                        </NavLink>
                        <div className='cardapsalut'>{user.status ?
                            <div className='cardapsalut_flex'>
                                <div>
                                    <div className='card_padarka'>
                                        <CiGift className='padarka' />Подарок
                                    </div>
                                    <div className='b_nalichne' style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "5px" }}>
                                        <FaCheck style={{ color: "#24C56E" }} /> В наличии
                                    </div>
                                </div>
                                <div className='card_sale'><div><IoIosPricetags className='sale_discaunt' /><div className='prise_apsalud'>{user.discount}</div></div><p className='p_none'>SALE</p></div>
                            </div>
                            :
                            <div className='cardapsalut_flex'>
                                <div>
                                    <div className='card_padarka'>
                                        <CiGift className='padarka' />Подарок
                                    </div>
                                    <div className='b_nalichne' style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                                        <FaXmark style={{ color: "#E44286" }} /> Нет в наличии
                                    </div>
                                </div>
                                <div className='card_sale'><div><IoIosPricetags className='sale_discaunt' /><div className='prise_apsalud'>{user.discount}</div></div><p className='p_none'>SALE</p></div>
                            </div>}
                        </div>
                        <div className='card_p_padding'>
                            <p className=''>{user.name.length > 0 ? user.name.slice(0, 50) + "..." : user.name}</p>
                            <div className='price'>
                                <h1>{Math.round(calcDis(user.price, user.discount))}₽ </h1><del>{Math.round(user.price)}₽</del>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default Card;
