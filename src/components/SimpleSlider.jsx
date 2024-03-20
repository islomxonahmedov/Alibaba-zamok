import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/slice/usersSlice';
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
const SimpleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  const users = useSelector(state => state.users.users);
  const status = useSelector(state => state.users.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === 'loading') {
    return <h1>loading....</h1>;
  }
  return (
    <Slider {...settings}>
          {users.map(user => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
    </Slider>
  );
}

export default SimpleSlider;
