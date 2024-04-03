// Katalog komponenti
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slice/usersSlice';
import { CiStar } from 'react-icons/ci';
import { TiStarFullOutline } from 'react-icons/ti';
import calcDis from 'calculate-discount-hojiakbar';
import { IoCheckmarkOutline } from "react-icons/io5";
import { HiMiniXMark } from "react-icons/hi2";
import { PiGiftThin } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { IoFilterOutline } from "react-icons/io5";
import Slider from '@mui/material/Slider';
function valuetext(value) {
    return `${value}°C`;
}

function Katalog() {
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();
    const [filterkatalog, setfilterkatalog] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [value, setValue] = useState([0, 10000]);
    const [sortBy, setSortBy] = useState("default");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Pagination uchun state'lar
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Har sahifadagi elementlar soni

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

    // Joriy sahifadagi foydalanuvchilarni aniqlash
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

    // Sahifani o'zgartirish funktsiyasi
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Keyingi va avvalgi sahifalar uchun funktsiyalar
    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

    // Filtrlarni qayta o'rnatish funktsiyasi
    const resetFilters = () => {
        const filterKatalogElement = document.querySelector('.filterkatalog');
        if (filterKatalogElement) {
            filterKatalogElement.style.display = 'block';
        }
    };

    const toggleParagraphVisibility = (index) => {
        setfilterkatalog(index === filterkatalog ? null : index);
    };
    const toggleParagraphVisibilityy = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };
    const sortProducts = (a, b) => {
        switch (sortBy) {
            case "cheap":
                return parseFloat(a.price) - parseFloat(b.price);
            case "expensive":
                return parseFloat(b.price) - parseFloat(a.price);
            case "bigDiscount":
                return parseFloat(b.discount) - parseFloat(a.discount);
            default:
                return 0;
        }
    };
    const sortedProducts = [...currentUsers].sort(sortProducts);

    return (
        <div className='katalog'>
            <div>
                <h1 style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "30px" }}>Накладные электронные замки <h5 style={{ fontSize: "18px", marginTop: "4px", fontWeight: "300" }}>({users.length})</h5></h1>
                <div className="filterboshi">
                    <div className='filterboshi1'>
                        <button onClick={() => toggleParagraphVisibility(0)}>Сбросить фильтры<IoFilterOutline style={{ color: "#4295E4", fontSize: "20px" }} /></button>
                        <button>Электронные кодовые замки <HiMiniXMark style={{ color: "#E44286", fontSize: "20px" }} /></button>
                    </div>
                    <div className='filterpricediskaunt'>
                        <select style={{ width: "170px",background:"white",outline:"none" }} name="" id="" onChange={(e) => setSortBy(e.target.value)}>
                            <option value="default">Сортировка</option>
                            <option value="cheap">Cheap</option>
                            <option value="expensive">Expensive</option>
                            <option value="bigDiscount">Big Discount</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="katalog2">
                {filterkatalog === 0 && (
                    <div className='filterkatalog'>
                        <h2 style={{ fontSize: "32px" }}>Фильтр</h2>
                        <h3 className='filterupflex' onClick={() => toggleParagraphVisibilityy(0)}>Цена{activeIndex === 0 ? <FaAngleUp style={{ fontSize: "20px", color: "#4295E4" }} /> : <FaAngleDown style={{ fontSize: "20px", color: "#938A9F" }} />}</h3>
                        {activeIndex === 0 && (
                            <div className='range_input'>
                                <Slider
                                    style={{ color: "#487B6C" }}
                                    value={value}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                    max={10000}
                                    min={0}
                                />
                            </div>
                        )}
                        <h3 className='filterupflex' onClick={() => toggleParagraphVisibilityy(1)}>Особенности{activeIndex === 1 ? <FaAngleUp style={{ fontSize: "20px", color: "#4295E4" }} /> : <FaAngleDown style={{ fontSize: "20px", color: "#938A9F" }} />}</h3>
                        {activeIndex === 1 && (
                            <p>2</p>
                        )}
                        <h3 className='filterupflex' onClick={() => toggleParagraphVisibilityy(2)}>Цвет{activeIndex === 2 ? <FaAngleUp style={{ fontSize: "20px", color: "#4295E4" }} /> : <FaAngleDown style={{ fontSize: "20px", color: "#938A9F" }} />}</h3>
                        {activeIndex === 2 && (
                            <p>3</p>
                        )}
                        <h3 className='filterupflex' onClick={() => toggleParagraphVisibilityy(3)}>Материал{activeIndex === 3 ? <FaAngleUp style={{ fontSize: "20px", color: "#4295E4" }} /> : <FaAngleDown style={{ fontSize: "20px", color: "#938A9F" }} />}</h3>
                        {activeIndex === 3 && (
                            <p>4</p>
                        )}
                        <h3 className='filterupflex' onClick={() => toggleParagraphVisibilityy(4)}>Размеры{activeIndex === 4 ? <FaAngleUp style={{ fontSize: "20px", color: "#4295E4" }} /> : <FaAngleDown style={{ fontSize: "20px", color: "#938A9F" }} />}</h3>
                        {activeIndex === 4 && (
                            <p>5</p>
                        )}
                    </div>
                )}
                <div>
                    <div className='catalogcard'>
                        {sortedProducts.map(user => (
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
                    {/* Sayfalama tugmalar */}
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "30px", gap: "30px" }}>
                        <button onClick={prevPage} disabled={currentPage === 1}><AiOutlineDoubleLeft /></button>
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={users.length}
                            paginate={paginate}
                        />
                        <button onClick={nextPage} disabled={currentPage === Math.ceil(users.length / itemsPerPage)}><AiOutlineDoubleRight /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sahifalash tugmalarini yaratuvchi komponent
const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul style={{ display: "flex", gap: "25px", justifyContent: "center", cursor: "pointer" }} className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Katalog;
