import React, { useState } from 'react';
import logo from '../../public/img/Logo.svg';
import { BsFillTelephoneFill } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import { HiOutlineBars3 } from "react-icons/hi2";


function Navbar() {
    const users = useSelector(state => state.users.users);
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(!isHovered);
    };

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        rtl: false,
    };
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="navbar">
            <div className="navbar_container">
                <div className="navbar_containerbox_1">
                    <div className="navbar_box1">
                        <img src={logo} alt="" />
                    </div>
                    <div className="navbar_box2">
                        <p>Главная</p>
                        <p
                            className={`katalog_hover ${isHovered ? 'active' : ''}`}
                            onClick={handleHover}
                            style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            Каталог {isHovered ? <GoChevronUp /> : <GoChevronDown />}
                        </p>
                        <p>Оптовая продажа</p>
                        <p>О нас</p>
                        <button className="toggle-button" onClick={toggleSidebar}>
                            <HiOutlineBars3 />
                        </button>
                    </div>
                </div>
                <div className="navbar_containerbox_2">
                    <div className='telefon_n'>
                        <BsFillTelephoneFill className="iconblue" style={{ fontSize: "25px" }} />
                        <p>+(998) 77 095 00 25</p>
                    </div>
                    <div><CiHeart className="iconblue" style={{ fontSize: "30px" }} /></div>
                    <div><CiShoppingCart className="iconblue" style={{ fontSize: "30px" }} /></div>
                </div>
            </div>
            {isHovered && (
                <div className="navbar_modal">
                    <div className="navbar_modal_1">
                        <p>Накладные электронные замки</p>
                        <p>Врезные электронные замки</p>
                        <p>Замки для квартиры</p>
                        <p>Замки для отелей</p>
                        <p>Замки для офиса</p>
                        <p>Замки для шкафчиков</p>
                        <p>Замки для раздевалок</p>
                    </div>
                    <div className="navbar_modal_2">
                        <div style={{ width: "270px", border: "1px solid #EAEAEA" }} className="carousel">
                            <Slider {...settings}>
                                {users.map((image) => (
                                    <div key={image.src}>
                                        <img src={image.img} alt={image.alt} />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            )}
            <div className={isOpen ? "sidebar open" : "sidebar"}>
                <ul className="menu">
                    <div onClick={toggleSidebar}>X</div>
                    <li><a href="#">Link 1</a></li>
                    <li><a href="#">Link 2</a></li>
                    <li><a href="#">Link 3</a></li>
                    <li><a href="#">Link 4</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
