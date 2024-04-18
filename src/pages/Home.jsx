import { useDispatch, useSelector } from "react-redux";
import { addItem} from '../redux/slice/BasketSlice';
import Card from "../components/Card";
import Slider from "react-slick";
import calcDis from "calculate-discount-hojiakbar";
import Swal from "sweetalert2";

function Home() {
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch()

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        rtl: false,
    };
    const handleAddProduct = (product) => {
        // Savatchadagi mahsulotlar ro'yxatini Local Storage dan yuklash
        const basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];

        // Mahsulot savatchada mavjudmi tekshirish
        const isProductExists = basketItems.some(item => item.id === product.id);

        if (isProductExists) {
            Swal.fire("Товар уже в корзине");
        } else {
            if (product.status === true) { // Agar mahsulot statusi true bo'lsa
                // Mahsulotni savatchaga qo'shish
                dispatch(addItem(product));
                localStorage.setItem('basketItems', JSON.stringify([...basketItems, product]));

                // Ular to'g'risida xabar chiqarish
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Товар успешно добавлен"
                });
            } else {
                Swal.fire("Этого товара в данный момент нет в наличии"); // Agar mahsulot statusi false bo'lsa
            }
        }
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
                                <button onClick={() => handleAddProduct(user)} className="homecaruselbtn" style={{ width: "200px", background: "#4295E4", color: "white", padding: "10px 0" }}>Добавить в корзину</button>
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
