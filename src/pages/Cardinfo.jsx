import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTargetProduct } from '../redux/slice/CardinfoSlice';

function Cardinfo() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const targetProduct = useSelector(state => state.targetProduct.targetProduct);
    const status = useSelector(state => state.targetProduct.status);

    useEffect(() => {
        dispatch(fetchTargetProduct(id));
    }, [dispatch, id]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Product Details</h1>
            <p>Name: {targetProduct.name}</p>
            <p>Price: {targetProduct.price}</p>
            {/* Other product details */}
        </div>
    );
}

export default Cardinfo;