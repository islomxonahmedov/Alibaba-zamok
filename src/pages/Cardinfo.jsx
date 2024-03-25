import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTargetProduct } from '../redux/slice/CardinfoSlice';
import { CiHeart, CiStar } from "react-icons/ci";
import { TiStarFullOutline } from 'react-icons/ti';
import { IoIosCheckbox } from "react-icons/io";
import Card from './Card';
import calcDis from 'calculate-discount-hojiakbar';
import { FaAngleDown } from 'react-icons/fa6';
import { addComment, fetchComments } from '../redux/slice/CommentSlice';

function Cardinfo() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const dispatch3 = useDispatch();
    const targetProduct = useSelector(state => state.targetProduct.targetProduct);
    const status = useSelector(state => state.targetProduct.status);
    const comments = useSelector(state => state.comments.comments);
    const error = useSelector(state => state.comments.error);

    const [activeIndex, setActiveIndex] = useState(null);
    const [stars, setStars] = useState(0);
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        dispatch(fetchTargetProduct(id));
        dispatch3(fetchComments(id));
    }, [dispatch, dispatch3, id]);

    useEffect(() => {
        const storedStars = localStorage.getItem('stars');
        if (storedStars) {
            setStars(parseInt(storedStars));
        }
    }, []);

    const handleImageClick = (imageUrl) => {
        setMainImage(imageUrl);
    };

    const handleStarClick = (index) => {
        setStars(index + 1);
        localStorage.setItem('stars', index + 1);
    };

    const toggleParagraphVisibility = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const handleAddComment = (comment) => {
        dispatch(addComment({ productId: id, comment }));
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }


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
                        <h3 style={{ background: activeIndex === 0 ? '#F6F7F9' : 'white' }} onClick={() => toggleParagraphVisibility(0)}>Оплата<FaAngleDown style={{ fontSize: "20px" }} /></h3>
                        {activeIndex === 0 && (
                            <p>Оплата при получении товара, Картой онлайн, Google Pay, Акционная оплата картой Visa, Безналичными для юридических лиц, Безналичными для физических лиц, Apple Pay, PrivatPay, Оплата картой в отделении</p>
                        )}
                        <h3 style={{ background: activeIndex === 1 ? '#F6F7F9' : 'white' }} onClick={() => toggleParagraphVisibility(1)}>Монтаж и доставка<FaAngleDown style={{ fontSize: "20px" }} /></h3>
                        {activeIndex === 1 && (
                            <p>Оплата при получении товара, Картой онлайн, Google Pay, Акционная оплата картой Visa, Безналичными для юридических лиц, Безналичными для физических лиц, Apple Pay, PrivatPay, Оплата картой в отделении</p>
                        )}
                        <h3 style={{ background: activeIndex === 2 ? '#F6F7F9' : 'white' }} onClick={() => toggleParagraphVisibility(2)}>Гарантии и выгода<FaAngleDown style={{ fontSize: "20px" }} /></h3>
                        {activeIndex === 2 && (
                            <p>Оплата при получении товара, Картой онлайн, Google Pay, Акционная оплата картой Visa, Безналичными для юридических лиц, Безналичными для физических лиц, Apple Pay, PrivatPay, Оплата картой в отделении</p>
                        )}
                    </div>
                </div>
            </div>
            <div className='pastcardinfo'>
                <NavLink style={{ borderBottom: activeIndex === 3 ? '3px solid #4295E4' : '3px solid white' }} onClick={() => toggleParagraphVisibility(3)}><p>Характеристики</p></NavLink>
                <NavLink style={{ borderBottom: activeIndex === 4 ? '3px solid #4295E4' : '3px solid white' }} onClick={() => toggleParagraphVisibility(4)}><p>Описание</p></NavLink>
                <NavLink style={{ borderBottom: activeIndex === 5 ? '3px solid #4295E4' : '3px solid white' }} onClick={() => toggleParagraphVisibility(5)}><p>Отзывы</p></NavLink>
            </div>
            <div>
                {activeIndex === 3 && (
                    <div className='xaraktercontainer'>
                        <div className='xarakter_b1'>
                            <div className='div'>
                                <div>Память на количество карт</div>
                                <p>2033</p>
                            </div>
                            <div className='div1'>
                                <div>Приложение</div>
                                <p>Нет</p>
                            </div>
                            <div className='div'>
                                <div>Материал</div>
                                <p>Сталь, силиконовые вставки</p>
                            </div>
                            <div className='div1'>
                                <div>Цвет</div>
                                <p>Черный, хром</p>
                            </div>
                            <div className='div'>
                                <div>Питание</div>
                                <p>DC 6V, 4 AAA</p>
                            </div>
                            <div className='div1'>
                                <div>Разблокировка</div>
                                <p>Пин-код, карта или браслет Mifaire, ключ, приложение</p>
                            </div>
                        </div>
                        <div className='xarakter_b1'>
                            <div className='div'>
                                <div>Тип двери</div>
                                <p>Деревянная, металлическая</p>
                            </div>
                            <div className='div1'>
                                <div>Толщина двери</div>
                                <p>38-55 мм</p>
                            </div>
                            <div className='div'>
                                <div>Размеры</div>
                                <p>302мм * 43мм * 22.55мм</p>
                            </div>
                            <div className='div1'>
                                <div>Вес</div>
                                <p>302мм * 43мм * 22.55мм</p>
                            </div>
                            <div className='div'>
                                <div>Комплектация</div>
                                <p>Без мартизы, с мартизой</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeIndex === 4 && (
                    <div className="opisanacontainer">
                        <div className="opisana_box1">
                            <p>{targetProduct.description}</p>
                            <p style={{ marginTop: "10px" }}>Подходит для установки на деревянную/межкомнатную дверь.</p>
                            <h3 style={{ fontSize: "30px", fontWeight: "500" }}>{targetProduct.name}:</h3>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px", alignItems: "start" }}><IoIosCheckbox style={{ color: "#4295E4", fontSize: "18px" }} />Минимизирует кражи среди персонала</div>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px", alignItems: "start" }}><IoIosCheckbox style={{ color: "#4295E4", fontSize: "18px" }} />Сложно взломать, высокая надежность</div>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px", alignItems: "start" }}><IoIosCheckbox style={{ color: "#4295E4", fontSize: "25px" }} />Можно отказаться от создания физических карт или ключей и высылать электронный ключ новым сотрудникам прямо на смартфон</div>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px", alignItems: "start" }}><IoIosCheckbox style={{ color: "#4295E4", fontSize: "18px" }} />Отслеживание статистики открытий с информацией о каждом открывавшем замок человеке</div>
                            <p>{targetProduct.description}</p>
                        </div>
                        <div className="opisana_box2">
                            <img src={targetProduct.img} alt="" />
                        </div>
                    </div>
                )}
                {activeIndex === 5 && (
                    <div className='comments'>
                        <h2>Comments</h2>
                        <ul>
                            {comments.map(comment => (
                                <li key={comment.id}>{comment.text}</li>
                            ))}
                        </ul>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const text = e.target.elements.comment.value;
                            handleAddComment(text);
                            e.target.elements.comment.value = '';
                        }}>
                            <input type="text" name="comment" placeholder="Add a comment" />
                            <button type="submit">Add</button>
                        </form>
                    </div>
                )}
            </div>
            <div>
                <Card />
            </div>
        </div>
    );
}

export default Cardinfo;
