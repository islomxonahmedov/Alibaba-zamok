import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTargetProduct } from '../redux/slice/CardinfoSlice';
import { CiHeart, CiStar } from "react-icons/ci";
import { TiStarFullOutline } from 'react-icons/ti';
import { IoIosCheckbox } from "react-icons/io";
import Card from './Card';
import calcDis from 'calculate-discount-hojiakbar';
import { FaAngleDown } from 'react-icons/fa6';

function Cardinfo() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const targetProduct = useSelector(state => state.targetProduct.targetProduct);
    const status = useSelector(state => state.targetProduct.status);
    const [activeIndex, setActiveIndex] = useState(null);
    const [stars, setStars] = useState(0);

    useEffect(() => {
        dispatch(fetchTargetProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        const storedStars = localStorage.getItem('stars');
        if (storedStars) {
            setStars(parseInt(storedStars));
        }
    }, []);

    const handleImageClick = (imageUrl) => {
        setMainImage(imageUrl);
    };

    const [mainImage, setMainImage] = useState('');

    const handleStarClick = (index) => {
        setStars(index + 1);
        localStorage.setItem('stars', index + 1);
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    const toggleParagraphVisibility = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className='info_container'>
            <div className="info_c_tepa">
                <div className="info_c_b1">
                    <div className='cardi_rasim1'><img src={mainImage || targetProduct.img} alt={targetProduct.name} /></div>
                    <div className='cardi_rasim2'>
                        <img src={targetProduct.img1} alt={targetProduct.name} onClick={() => handleImageClick(targetProduct.img1)} />
                        <img src={targetProduct.img2} alt={targetProduct.name} onClick={() => handleImageClick(targetProduct.img2)} />
                        <img src={targetProduct.img3} alt={targetProduct.name} onClick={() => handleImageClick(targetProduct.img3)} />
                        <img src={targetProduct.img4} alt={targetProduct.name} onClick={() => handleImageClick(targetProduct.img4)} />
                    </div>
                </div>
                <div className="info_c_b2">
                    <div className='b1'>
                        <p style={{ color: "#454F5B" }}>JA182765</p>
                        <div style={{ display: "flex", fontSize: "20px" }}>
                            {[...Array(5)].map((_, index) => (
                                <span key={index} onClick={() => handleStarClick(index)}>
                                    {index < stars ? <TiStarFullOutline style={{ color: "#F6AB3A" }} /> : <CiStar style={{ color: "#C4CDD5" }} />}
                                </span>
                            ))}
                        </div>
                        <p style={{ color: "#4295E4" }}>(12) отзывов</p>
                    </div>
                    <div className="b2">
                        {targetProduct.name}
                    </div>
                    <div className="b3">
                        Подходит для установки на :
                    </div>
                    <div className="b4">
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}><IoIosCheckbox style={{ color: "#4295E4", fontSize: "18px" }} />Деревянную дверь</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}><IoIosCheckbox style={{ color: "#4295E4", fontSize: "18px" }} />Межкомнатную дверь</div>
                    </div>
                    <div className="b5">
                        <div>
                            <div>Комплектация</div>
                            <select className='infoselect' name="" id="">
                                <option value="salom">Smart замок без приложения</option>
                                <option value="salom">Умный замок</option>
                                <option value="salom">Ты открываешь дверь сам</option>
                                <option value="salom">Сканером</option>
                            </select>
                        </div>
                        <div>
                            <div>Цвет</div>
                            <p style={{ display: "flex", gap: "10px" }}>
                                <div style={{ width: "40px", height: "40px", background: "white", border: "1px solid #4295E4" }}></div>
                                <div style={{ width: "40px", height: "40px", background: "#161C24" }}></div>
                                <div style={{ width: "40px", height: "40px", background: "#E2C355" }}></div>
                            </p>
                        </div>
                    </div>
                    <div className="b6">
                        <h1>{Math.round(calcDis(targetProduct.price, targetProduct.discount))}₽ </h1><del>{Math.round(targetProduct.price)}₽</del>
                    </div>
                    <div className="b7">
                        <button className='globalbutton'>Купить</button>
                        <button className='cardinfolike'><div><CiHeart style={{ fontSize: "30px" }} /></div> В избранное</button>
                    </div>
                    <div className="b8">
                        <h3 onClick={() => toggleParagraphVisibility(0)}>Оплата<FaAngleDown /></h3>
                        {activeIndex === 0 && (
                            <p>Оплата при получении товара, Картой онлайн, Google Pay, Акционная оплата картой Visa, Безналичными для юридических лиц, Безналичными для физических лиц, Apple Pay, PrivatPay, Оплата картой в отделении</p>
                        )}
                        <h3 onClick={() => toggleParagraphVisibility(1)}>Монтаж и доставка<FaAngleDown /></h3>
                        {activeIndex === 1 && (
                            <p>Оплата при получении товара, Картой онлайн, Google Pay, Акционная оплата картой Visa, Безналичными для юридических лиц, Безналичными для физических лиц, Apple Pay, PrivatPay, Оплата картой в отделении</p>
                        )}
                        <h3 onClick={() => toggleParagraphVisibility(2)}>Гарантии и выгода<FaAngleDown /></h3>
                        {activeIndex === 2 && (
                            <p>Оплата при получении товара, Картой онлайн, Google Pay, Акционная оплата картой Visa, Безналичными для юридических лиц, Безналичными для физических лиц, Apple Pay, PrivatPay, Оплата картой в отделении</p>
                        )}
                    </div>
                </div>
            </div>
            <h1>Product Details</h1>
            <p>Name: {targetProduct.name}</p>
            <p>Price: {targetProduct.price}</p>
            <div>
                <Card />
            </div>
        </div>
    );
}

export default Cardinfo;
