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
import Card from '../components/Card';
function valuetext(value) {
    return `${value}°C`;
}

function Katalog() {
    // usersni olib kelish
    const users = useSelector(state => state.users.users);

    // dispatch                                                                                                                                                                                                             
    const dispatch = useDispatch();

    // filter modal ochilishi
    const [filterkatalog, setfilterkatalog] = useState(null);

    // h3-lar chilishi
    const [activeIndex, setActiveIndex] = useState(0);

    // rang state
    const [value, setValue] = useState([0, 10000]);

    // filter yani price bo'yicha option
    const [sortBy, setSortBy] = useState("default");

    // Pagination uchun state'lar
    const [currentPage, setCurrentPage] = useState(1);

    // bitta pagedan qancha mahsulot borligi
    const [itemsPerPage] = useState(6);

    const [priceRange, setPriceRange] = useState([0, 5000]);

    const [selectedColors, setSelectedColors] = useState([]);
    const handleColorChange = (event) => {
        const { value } = event.target;
        setSelectedColors(value);
    };

    // Fetching users
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // Filtering users based on the selected price range
    const filteredUsers = users.filter(user =>
        (selectedColors.length === 0 || selectedColors.includes(user.color)) &&
        user.price >= priceRange[0] && user.price <= priceRange[1]
    ).sort((a, b) => {
        switch (sortBy) {
            case "cheap": return a.price - b.price;
            case "expensive": return b.price - a.price;
            case "bigDiscount": return b.discount - a.discount;
            default: return 0;
        }
    });

    // Calculate the current items to display
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Handle changing pages
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    // malumotlarni effectga solish
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // yulduzga state
    const [starRatings, setStarRatings] = useState({});

    // yulduzni effektga solish
    useEffect(() => {
        const storedRatings = JSON.parse(localStorage.getItem('starRatings'));
        if (storedRatings) {
            setStarRatings(storedRatings);
        }
    }, []);

    // yulduzni local storig ga saqlash
    const handleStarClick = (id, index) => {
        const updatedRatings = { ...starRatings, [id]: index + 1 };
        setStarRatings(updatedRatings);
        localStorage.setItem('starRatings', JSON.stringify(updatedRatings));
    };

    // Joriy sahifadagi foydalanuvchilarni aniqlash
    const indexOfLastItem = currentPage * itemsPerPage;

    // filter ni ochilish funksiyasi
    const toggleParagraphVisibility = (index) => {
        setfilterkatalog(index === filterkatalog ? null : index);
    };

    // h3 larni ochish funksiyasi
    const toggleParagraphVisibilityy = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    // sortby funksiyasi
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
    const [selected, setSelected] = useState('');
    const [filteredUserns, setFilteredUserns] = useState([]);


    const handleChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelected(value);
        } else {
            setSelected('');
        }
    };

    useEffect(() => {
        if (selected.length > 0) {
            setFilteredUserns(users.filter(user => selected.includes(user.category)));
        } else {
            setFilteredUserns(users);
        }
    }, [selected, users]);

    // malumotlarni bitta o'zgaruvchiga tenglash
    const sortedProducts = [...currentUsers].sort(sortProducts);

    const combinedUsers = sortedProducts.filter(product =>
        filteredUserns.some(filteredUser => filteredUser.id === product.id)
    );
    const [categoryCounts, setCategoryCounts] = useState({});

    useEffect(() => {
        const counts = users.reduce((acc, user) => {
            acc[user.category] = (acc[user.category] || 0) + 1;
            return acc;
        }, {});
        setCategoryCounts(counts);
    }, [users]);
    const refreshPage = () => {
        window.location.reload(false); // Sahifani yangilaydi
    };
    return (
        <div className='katalog'>
            <div>
                <h1 className='katslogh1' style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "30px" }}>Накладные электронные замки <h5 style={{ fontSize: "18px", marginTop: "4px", fontWeight: "300" }}>({users.length})</h5></h1>
                <div className="filterboshi">
                    <div className='filterboshi1'>
                        <button onClick={() => toggleParagraphVisibility(0)}>Сбросить фильтры<IoFilterOutline style={{ color: "#4295E4", fontSize: "20px" }} /></button>
                        <button onClick={refreshPage} className='buuuton'>Очистить все<HiMiniXMark style={{ color: "#E44286", fontSize: "20px" }} /></button>
                    </div>
                    <div className='filterpricediskaunt'>
                        <select className='selectkatalog' style={{ width: "170px", background: "white", outline: "none" }} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="default">Сортировка</option>
                            <option value="cheap">Дешевый</option>
                            <option value="expensive">Дорогой</option>
                            <option value="bigDiscount">Большая скидка</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="katalog2">
                {filterkatalog === 0 && (
                    <div className='filterkatalog'>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <h2 style={{ fontSize: "32px" }}>Фильтр</h2>
                            <h3 className='xmark' onClick={() => setfilterkatalog(null)}><HiMiniXMark style={{ fontSize: "20px", cursor: "pointer" }} /></h3>
                        </div>
                        <h3 className='filterupflex' onClick={() => toggleParagraphVisibilityy(0)}>Цена{activeIndex === 0 ? <FaAngleUp style={{ fontSize: "20px", color: "#4295E4" }} /> : <FaAngleDown style={{ fontSize: "20px", color: "#938A9F" }} />}</h3>
                        {activeIndex === 0 && (
                            <div className='range_input'>
                                <div class="price-range-buttons">
                                    <button>{`Мин: ${priceRange[0]}₽`}</button>
                                    <button>{`Макс: ${priceRange[1]}₽`}</button>
                                </div>
                                <Slider value={priceRange}
                                    onChange={(event, newValue) => setPriceRange(newValue)}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={6000}
                                    style={{ width: '200px', marginLeft: "25px" }}
                                />
                            </div>
                        )}
                        <h3 className='filterupflex' onClick={() => toggleParagraphVisibilityy(1)}>Особенности{activeIndex === 1 ? <FaAngleUp style={{ fontSize: "20px", color: "#4295E4" }} /> : <FaAngleDown style={{ fontSize: "20px", color: "#938A9F" }} />}</h3>
                        {activeIndex === 1 && (
                            <div className='categoriyinputs'>
                                <div className='input_labelchex'>
                                    <input type="checkbox" id="electronic_lock" checked={selected.includes('electronic_lock')} onChange={handleChange} value="electronic_lock" />
                                    <label className='labelw' htmlFor="electronic_lock">Электронные кодовые замки</label>
                                    <div>({categoryCounts['electronic_lock'] || 0})</div>
                                </div>
                                <div className='input_labelchex'>
                                    <input type="checkbox" id="mechanical_lock" checked={selected.includes('mechanical_lock')} onChange={handleChange} value="mechanical_lock" />
                                    <label className='labelw' htmlFor="mechanical_lock">Механические замки</label>
                                    <div>({categoryCounts['mechanical_lock'] || 0})</div>
                                </div>
                                <div className='input_labelchex'>
                                    <input type="checkbox" id="pinkod_lock" checked={selected.includes('pinkod_lock')} onChange={handleChange} value="pinkod_lock" />
                                    <label className='labelw' htmlFor="pinkod_lock">Пинкод замки</label>
                                    <div>({categoryCounts['pinkod_lock'] || 0})</div>
                                </div>
                            </div>
                        )}
                        <h3 className='filterupflex' onClick={() => toggleParagraphVisibilityy(2)}>Цвет{activeIndex === 2 ? <FaAngleUp style={{ fontSize: "20px", color: "#4295E4" }} /> : <FaAngleDown style={{ fontSize: "20px", color: "#938A9F" }} />}</h3>
                        {activeIndex === 2 && (
                            <div style={{ marginLeft: "20px", display: "flex", flexDirection: "column", gap: "5px" }}>
                                {['Черный', 'Желтый', 'Розовый'].map(color => (
                                    <div style={{ display: "flex", gap: "5px" }} key={color}>
                                        <input
                                            type="checkbox"
                                            id={color}
                                            checked={selectedColors === color}
                                            onChange={handleColorChange}
                                            value={color}
                                        />
                                        <label htmlFor={color}>{color}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                        <h3 className='filterupflex' onClick={() => toggleParagraphVisibilityy(3)}>Материал{activeIndex === 3 ? <FaAngleUp style={{ fontSize: "20px", color: "#4295E4" }} /> : <FaAngleDown style={{ fontSize: "20px", color: "#938A9F" }} />}</h3>
                        {activeIndex === 3 && (
                            <p>4</p>
                        )}
                        <h3 className='filterupflex' onClick={() => toggleParagraphVisibilityy(4)}>Размеры{activeIndex === 4 ? <FaAngleUp style={{ fontSize: "20px", color: "#4295E4" }} /> : <FaAngleDown style={{ fontSize: "20px", color: "#938A9F" }} />}</h3>
                        {activeIndex === 4 && (
                            <p>5</p>
                        )}
                        <button style={{display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid #4295E4",padding:"5px 0"}} onClick={refreshPage} className='buuuton'>Очистить все<HiMiniXMark style={{ color: "#E44286", fontSize: "20px" }} /></button>
                    </div>
                )}

                <div>
                    <div className='catalogcard'>
                        {combinedUsers.map(user => (
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
                    <div style={{ display: "flex", gap: "10px", marginTop: "20px", justifyContent: "center" }} className="pagination">
                        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
                        {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }, (_, index) => (
                            <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
                        ))}
                        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredUsers.length / itemsPerPage)))} disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}>Next</button>
                    </div>
                </div>
            </div>
            <div className='katalogkompcard'>
                <Card />
            </div>
        </div>
    );
}

export default Katalog;
