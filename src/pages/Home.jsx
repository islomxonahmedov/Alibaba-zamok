import { useSelector } from "react-redux";
import Card from "../components/Card";
import Slider from "react-slick";
import calcDis from "calculate-discount-hojiakbar";

function Home() {
    const users = useSelector(state => state.users.users);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        rtl: false,
    };

    return (
        <div className="homecontainer">
            <div className="homesection_1_carusel">
                <Slider {...settings}>
                    {users.map(user => (
                        <div key={user.id} className='katta_karusel'>
                            <figure><img className='cardimg' src={user.img} alt="" /></figure>
                            <div className='katta_karusel_box2'>
                                <p className='fulname'>{user.name.length > 0 ? user.name.slice(0, 30) + " " : user.name}</p>
                                <div style={{ color: "#454F5B" }} className="home_deskiription">{user.description.length > 0 ? user.description.slice(0, 90) + " " : user.description}</div>
                                <div style={{ color: "#454F5B" }} className="home_deskiription mn">{user.tittle.length > 0 ? user.tittle.slice(0, 50) + " " : user.tittle}</div>
                                <div className='price'>
                                    <div>Цена</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "25px" }}><h1>{Math.round(calcDis(user.price, user.discount))}₽ </h1><del style={{ fontSize: "32px", color: "#A4A4A4", fontWeight: "300" }}>{Math.round(user.price)}₽</del></div>
                                </div>
                                <button className="homecaruselbtn" style={{ width: "200px", background: "#4295E4", color: "white", padding: "10px 0" }}>Добавить в корзину</button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="homecaruselcontainer">
                <Card />
            </div>
        </div>
    );
}

export default Home;
