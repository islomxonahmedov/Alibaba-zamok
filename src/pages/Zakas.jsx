import calcDis from 'calculate-discount-hojiakbar';
import React, { useEffect, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Zakas() {
    const [basketItems, setBasketItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeIndex1, setActiveIndex1] = useState(null);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('basketItems')) || [];
        setBasketItems(storedItems);
        calculateTotalPrice(storedItems);
    }, []);

    const calculateTotalPrice = (items) => {
        let total = 0;
        items.forEach(item => {
            total += item.price * item.count;
        });
        setTotalPrice(total);
    };

    const handleIncrement = (id) => {
        const updatedItems = basketItems.map(item => {
            if (item.id === id) {
                return { ...item, count: item.count + 1 };
            }
            return item;
        });
        setBasketItems(updatedItems);
        localStorage.setItem('basketItems', JSON.stringify(updatedItems));
        calculateTotalPrice(updatedItems);
    };

    const handleDecrement = (id) => {
        const updatedItems = basketItems.map(item => {
            if (item.id === id && item.count > 1) {
                return { ...item, count: item.count - 1 };
            }
            return item;
        });
        setBasketItems(updatedItems);
        localStorage.setItem('basketItems', JSON.stringify(updatedItems));
        calculateTotalPrice(updatedItems);
    };

    const toggleParagraphVisibility = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };
    const toggleParagraphVisibility2 = (index) => {
        setActiveIndex1(index === activeIndex1 ? null : index);
    };
    const navigate = useNavigate
    return (
        <div className='zakascontainer'>
            <h2 style={{ fontSize: "30px" }}>Оформление заказа</h2>
            <div className='zakascardk'>
                <div className='zakascontent'>
                    <h3 style={{ fontSize: "25px" }}>1. Контактные данные</h3>
                    <div className='flexlarinputaj'>
                        <div className='namelarinputflex'>
                            <label htmlFor="fname">Фамилия</label>
                            <input className='zakasinput' type="text" id='fname' name='fname' placeholder='Abubakirov' />
                        </div>
                        <div className='namelarinputflex'>
                            <label htmlFor="lname">Имя</label>
                            <input className='zakasinput' type="text" id='lname' name='lname' placeholder='Abubakir' />
                        </div>
                    </div>
                    <div className='flexlarinputaj'>
                        <div className='namelarinputflex'>
                            <label htmlFor="tname">Телефон</label>
                            <input className='zakasinput' type="tel" id='tname' name='tname' placeholder='+998 (77) 095 00 25' />
                        </div>
                        <div className='namelarinputflex'>
                            <label htmlFor="ename">E-mail</label>
                            <input className='zakasinput' type="email" id='ename' name='ename' placeholder='abubakirovabubakir@mail.ru' />
                        </div>
                    </div>
                    <h3 style={{ fontSize: "25px" }}>2. Доставка</h3>
                    <div className='flexlarinputaj1'>
                        <div onInput={() => toggleParagraphVisibility(0)} className='namelarinputflex1'>
                            <input type="radio" id='rname' name='contactMethod' />
                            <label htmlFor="rname">Россия</label>
                        </div>
                        {activeIndex === 0 && (
                            <div className='selectcar'>
                                <select className='selectcar2'>
                                    <option value="0">Выберите город</option>
                                    <option value="1">Moskva</option>
                                    <option value="2">Sankt-Peterburg</option>
                                    <option value="3">Volgograd</option>
                                    <option value="4">Perm</option>
                                    <option value="5">Ufa</option>
                                    <option value="6">Tyumen</option>
                                    <option value="7">Orsk</option>
                                    <option value="8">Qozon</option>
                                    <option value="9">Voronej</option>
                                    <option value="10">Omsk</option>
                                </select>
                            </div>
                        )}
                        <div onInput={() => toggleParagraphVisibility(1)} className='namelarinputflex1'>
                            <input type="radio" id='uname' name='contactMethod' />
                            <label htmlFor="uname">Узбекистан</label>
                        </div>
                        {activeIndex === 1 && (
                            <div className='selectcar'>
                                <select className='selectcar2'>
                                    <option value="0">Выберите город</option>
                                    <option value="1">Наманган</option>
                                    <option value="2">Андижан</option>
                                    <option value="3">Фергана</option>
                                    <option value="4">Ташкент</option>
                                    <option value="5">Самарканд</option>
                                    <option value="6">Бухара</option>
                                    <option value="7">Джиза</option>
                                    <option value="8">Сурхандарьинская</option>
                                    <option value="9">Кашкадарья</option>
                                    <option value="10">Навои</option>
                                </select>
                            </div>
                        )}
                        <div onInput={() => toggleParagraphVisibility(2)} className='namelarinputflex1'>
                            <input type="radio" id='aname' name='contactMethod' />
                            <label htmlFor="aname">США</label>
                        </div>
                        {activeIndex === 2 && (
                            <div className='selectcar'>
                                <select className='selectcar2'>
                                    <option value="0">Выберите город</option>
                                    <option value="1">Аляска</option>
                                    <option value="2">Техас</option>
                                    <option value="3">Калифорния</option>
                                    <option value="4">Мексика</option>
                                    <option value="5">Нью-Йорк</option>
                                    <option value="6">Флорида</option>
                                    <option value="7">Колорадо</option>

                                </select>
                            </div>
                        )}
                    </div>
                    <h3 style={{ fontSize: "25px" }}>3. Оплата</h3>
                    <div className='namelarinputflex1'>
                        <input type="radio" id='nname' name='contactMethod2' />
                        <label htmlFor="nname">Оплата при получении товара</label>
                    </div>
                    <div onInput={() => toggleParagraphVisibility2(0)} className='namelarinputflex1'>
                        <input type="radio" id='pname' name='contactMethod2' />
                        <label htmlFor="pname">Банковская карта</label>
                    </div>
                    {activeIndex1 === 0 && (
                        <>
                            <div className='flexlarinputaj'>
                                <div className='namelarinputflex'>
                                    <label htmlFor="kname">Полное имя владельца карты</label>
                                    <input className='zakasinput' type="tel" id='kname' name='kname' placeholder='Полное имя владельца карты' />
                                </div>
                                <div className='namelarinputflex'>
                                    <label htmlFor="krname">Номер карты</label>
                                    <input className='zakasinput' type="email" id='krname' name='krname' placeholder='0000 0000 0000 0000' />
                                </div>
                            </div>
                            <div className='flexlarinputaj'>
                                <div className='namelarinputflex'>
                                    <label htmlFor="kname">Дата истечения срока действия</label>
                                    <input className='zakasinput' type="tel" id='kname' name='kname' placeholder='01/23' />
                                </div>
                                <div className='namelarinputflex'>
                                    <label htmlFor="krname">CVV</label>
                                    <input className='zakasinput' type="email" id='krname' name='krname' placeholder='CVV' />
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className='zakascard'>
                    <div style={{ fontSize: "22px", fontWeight: "500" }}>Итого</div>
                    <div className='bordertop'>
                        {basketItems.map(item => (
                            <div className='basketcard2' key={item.id}>
                                <div className='basketcard_flex2'>
                                    <img style={{ width: "80px" }} src={item.img} alt="" />
                                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                        <p>{item.name.length > 0 ? item.name.slice(0, 35) + "..." : item.name}</p>
                                        <div style={{ gap: "30px" }} className='caunter'>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div className='caunterlar' onClick={() => handleDecrement(item.id)}>-</div>
                                                <div>{item.count}</div>
                                                <div className='caunterlar' onClick={() => handleIncrement(item.id)}>+</div>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><h1 style={{ fontSize: '20px', color: "#161C24" }}>{Math.round(calcDis(item.price, item.discount))}₽ </h1><del style={{ color: "#454F5B" }}>{Math.round(item.price)}₽</del></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", fontWeight: "500" }}>
                            <div>К оплате:</div>
                            <div>{totalPrice.toLocaleString()} ₽</div>
                        </div>
                    </div>
                    <div style={{ marginTop: "5px" }}>Комплектация</div>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <div style={{ display: "flex", gap: "5px" }}>
                            <input type="checkbox" name='contactMethod3' id='oname' />
                            <label htmlFor="oname">Нужна установка</label>
                        </div>
                        <div style={{ display: "flex", gap: "5px" }}>
                            <input type="checkbox" id='wname' name='contactMethod3' />
                            <label htmlFor="wname">Настройка софта</label>
                        </div>
                    </div>
                    <button onClick={() => {
                        Swal.fire({
                            title: 'Ваш запрос принят!',
                            html: `<p>Вскоре вы получите электронное письмо с подтверждением заказа и указанием ожидаемой даты доставки ваших товаров.</p>`,
                            icon: 'success',
                            confirmButtonColor: '#46A358',
                            confirmButtonText: 'Track your order',
                        }).then((result) => {
                            if (result.value) {
                                // Mahsulotlarni savatchadan o'chirish
                                localStorage.removeItem('basketItems'); // Agar savat mahsulotlari "basketItems" kalit bilan saqlangan bo'lsa
                                window.location.href = '/'; // Foydalanuvchini bosh sahifaga yo'naltirish
                            }
                        })
                    }} style={{ margin: "5px 0 5px 55px" }} className='globalbutton'>Подтвердить заказ</button>


                </div>
            </div>
        </div>

    );
}

export default Zakas;
