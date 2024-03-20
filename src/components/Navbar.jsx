import React, { useState } from 'react';
import logo from '../../public/img/Logo.svg';
import { BsFillTelephoneFill } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { GoChevronDown, GoChevronUp } from "react-icons/go"; // GoChevronUp import qilindi

function Navbar() {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(!isHovered);
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
                            Каталог {isHovered ? <GoChevronUp /> : <GoChevronDown />} {/* GoChevronDown o'rniga GoChevronUp qo'yildi */}
                        </p>
                        <p>Оптовая продажа</p>
                        <p>О нас</p>
                    </div>
                </div>
                <div className="navbar_containerbox_2">
                    <div>
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

                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
