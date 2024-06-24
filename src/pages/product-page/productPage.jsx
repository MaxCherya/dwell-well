import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import { db } from '../../components/firebase'
import { collection, doc, getDoc } from 'firebase/firestore';
import './productPage.css'
import { CartContext } from '../../CartContext';
import { ToastContainer, toast } from 'react-toastify';

//icons 
import { FaCartArrowDown } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";

export default function ProductPage() {
    const { cartList, setCartList } = useContext(CartContext);
    const { productId } = useParams();  // Get product ID from URL
    const [product, setProduct] = useState(null);
    const productsRef = collection(db, 'products');

    const getProductDetails = async () => {
        try {
            const docRef = doc(productsRef, productId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists) {
                setProduct(docSnap.data());
            } else {
                console.error("Product not found");
            }
        } catch (err) {
            console.error(err);
        }
    }

    const notify = () => toast.success('The item is added to cart', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    const addHandler = (id) => {
        notify();
        setCartList(prevCartList => {
            // Check if the item already exists in the cart
            const itemIndex = prevCartList.findIndex(item => item.id === id);
            // If the item exists, update its quantity
            if (itemIndex !== -1) {
                const updatedCartList = [...prevCartList];
                updatedCartList[itemIndex] = {
                    ...updatedCartList[itemIndex],
                    quantity: updatedCartList[itemIndex].quantity + 1
                };
                console.log(cartList);
                return updatedCartList;
            }

            // If the item doesn't exist, add it to the cart with quantity 1
            return [...prevCartList, { id, quantity: 1 }];
        });
    }

    useEffect(() => {
        getProductDetails();
        localStorage.setItem('cartList', JSON.stringify(cartList));
    }, [productId, cartList]); // Update when product ID changes

    return (
        <div id="product-page">
            <ToastContainer />
            <Link to='/shop'><IoArrowBack id='back-go' /></Link>
            {product ? (
                <div className='pd-wrapper'>
                    <img src={product.img} alt={product.name} />
                    <h1>{product.name}</h1>
                    <div dangerouslySetInnerHTML={{ __html: product.description }} id='description'/>
                    <p id='price'>$ {product.price}</p>
                    <button id='add-to-cart-btn' onClick={() => addHandler(productId)}><FaCartArrowDown /> Add to Cart</button>
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
}