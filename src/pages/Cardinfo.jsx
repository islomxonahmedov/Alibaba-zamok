import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTargetProduct } from '../redux/slice/CardinfoSlice';
import Card from './Card';

function Cardinfo() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const targetProduct = useSelector(state => state.targetProduct.targetProduct);
    const status = useSelector(state => state.targetProduct.status);

    useEffect(() => {
        dispatch(fetchTargetProduct(id));
    }, [dispatch, id]);

    const handleImageClick = (imageUrl) => {
        setMainImage(imageUrl);
    };

    const [mainImage, setMainImage] = useState('');

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div className='info_container'>
            <div className="info_c_tepa">
                <div className="info_c_b1">
                    <div className='cardi_rasim1'><img style={{width:"300px"}} src={mainImage || targetProduct.img} alt={targetProduct.name} /></div>
                    <div className='cardi_rasim2'>
                        <img src={targetProduct.img1} alt={targetProduct.name} onClick={() => handleImageClick(targetProduct.img1)} />
                        <img src={targetProduct.img2} alt={targetProduct.name} onClick={() => handleImageClick(targetProduct.img2)} />
                        <img src={targetProduct.img3} alt={targetProduct.name} onClick={() => handleImageClick(targetProduct.img3)} />
                        <img src={targetProduct.img4} alt={targetProduct.name} onClick={() => handleImageClick(targetProduct.img4)} />
                    </div>
                </div>
                <div className="info_c_b2"></div>
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
