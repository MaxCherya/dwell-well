import React, { useEffect, useState } from 'react'
import './orders.css'
import { db } from '../../components/firebase'
import { useAuth } from '../../AuthContext';
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';

export default function Orders() {

    const ordersRef = collection(db, 'orders');
    const { user } = useAuth();
    const [ordersList, setOrdersList] = useState([]);

    const updateOrdersList = async () => {
        try {
            const data = await getDocs(ordersRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setOrdersList(filteredData);
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        updateOrdersList();
    }, []);

    const doneOrder = async (id) => {
        const orderRef = doc(db, 'orders', id);
    
        try {
            const orderDoc = await getDoc(orderRef);
            if (orderDoc.exists()) {
                await deleteDoc(orderRef); // Pass the document reference, not the snapshot
                setOrdersList(prevOrders => prevOrders.filter(order => order.id !== id));
            } else {
                console.error('No such document!');
            }
        } catch (err) {
            console.error(err);
        }
    }
    

    return (
        <div className='orders-container'>
            {user && user.uid === '0I7n46QjZIPZsfhMHs3wzPiWSHG2' ? (ordersList.length === 0 ? (<h1>No orders yet...</h1>) : null) : null}
            {user ? (user.uid === '0I7n46QjZIPZsfhMHs3wzPiWSHG2' ?
                (
                    ordersList.map((order) => (
                        <div className='order-wrapper'>
                            <h1>{order.name} {order.surname}</h1>
                            <p id='receiper-email'>{order.email}</p>
                            <div className='country-region-wrapper'>
                                <p>Country: {order.country}</p>
                                <p>Region: {order.region}</p>
                            </div>
                            <div className='country-region-wrapper'>
                                <p>City: {order.city}</p>
                                <p>Street: {order.street}</p>
                            </div>
                            <div className='country-region-wrapper'>
                                <p>Facility №: {order.facility}</p>
                                <p>Zip-Code: {order.zip}</p>
                            </div>
                            {order.items.map((product) => (
                                <div className='item-ordered-wrapper'>
                                    <p id='ordered-product-name'>{product.name}</p>
                                    <img src={product.img} alt='product was deleted' />
                                    <div className='country-region-wrapper'>
                                        <p>Quantity:{product.quantity}</p>
                                        <p>Price per unit: {product.price}</p>
                                    </div>
                                    <p>Total: {(product.price * product.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            <button id='btn-done-ordered' onClick={() => doneOrder(order.id)}>Done</button>
                        </div>
                    ))
                ) : null) : null}
        </div>
    )
}
