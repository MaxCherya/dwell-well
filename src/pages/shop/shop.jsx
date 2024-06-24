import React, { useEffect, useState, useContext } from 'react';
import { db, storage } from '../../components/firebase';
import { addDoc, collection, getDocs, doc, deleteDoc, getDoc } from 'firebase/firestore';
import '../../normalize.css';
import './shop.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '../../CartContext';
import { useAuth } from '../../AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import logo from "../../imgs/logo.png";
import { v4 } from "uuid";
import { deleteObject, ref, ref as sRef } from 'firebase/storage';
import { getDownloadURL, uploadBytes } from 'firebase/storage';

// icons 
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { MdOutlineTransitEnterexit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";


export default function Shop() {

  const { cartList, setCartList } = useContext(CartContext);
  const { user } = useAuth();

  const [productsList, setProductsList] = useState([]);
  const productsRef = collection(db, 'products');

  const [apext, setApext] = useState(false);
  const [rusure, setRusure] = useState(false);

  // adding product
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState('');
  const [productImageUpload, setProductImageUpload] = useState(null);

  const [currentToDeleteId, setCurrentToDeleteId] = useState('');

  const uploadProductPhoto = async () => {
    const imageId = v4(); // Generate unique ID for the image
    const imagesProductsRef = sRef(storage, `products-img/${imageId}`);
    try {
      await uploadBytes(imagesProductsRef, productImageUpload);
      const downloadURL = await getDownloadURL(imagesProductsRef);
      await addDoc(productsRef, { name: productName, description: productDescription, price: productPrice, img: downloadURL });
      notifyAdd();
      setProductName('');
      setProductPrice(0);
      setProductDescription('');
      setProductImageUpload(null)
      setApext(false);
    }
    catch (err) {
      console.log(err);
    }
  };

  var toolBarOptions = [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link'],
    ['clean']
  ]

  const modules = {
    toolbar: toolBarOptions,
  };

  const updateProductsList = async () => {
    try {
      const data = await getDocs(productsRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setProductsList(filteredData);
      console.log(productsList);
    }
    catch (err) {
      console.error(err);
    }
  }

  const notifyAdd = () => toast.success('The product was uploaded', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const notifyDelete = () => toast.success('The product was deleted', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

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
        return updatedCartList;
      }

      // If the item doesn't exist, add it to the cart with quantity 1
      return [...prevCartList, { id, quantity: 1 }];
    });
  }

  useEffect(() => {
    updateProductsList();
    localStorage.setItem('cartList', JSON.stringify(cartList));
  }, [cartList]);

  const deleteProductHandler = (id) => {
    setCurrentToDeleteId(id);
    setRusure(!rusure);
  }

  const forceDeleteProduct = async (productId) => {
    const productRef = doc(db, 'products', productId);

    try {
      const productDoc = await getDoc(productRef);
      if (productDoc.exists()) {
        const productData = productDoc.data();
        const imageUrl = productData.img;
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
        await deleteDoc(productRef);
        setProductsList(prevProducts => prevProducts.filter(product => product.id !== productId));
        setCurrentToDeleteId('');
        setRusure(!rusure)
        notifyDelete();
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className='head'>
        <h1>Fresh, Seasonal, Delivered: Shop Our Organic Groceries</h1>
      </div>
      {rusure ? (
        <section className='rusure-container'>
          <div className='rusure-wrapper'>
            <h1>Are you sure you want to delete this product?</h1>
            <div className='rusure-btns'>
              <button onClick={() => forceDeleteProduct(currentToDeleteId)}>Yes, delete</button>
              <button onClick={() => setRusure(!rusure)}>No</button>
            </div>
          </div>
        </section>
      )
        : null}
      {user ? (user.uid === '0I7n46QjZIPZsfhMHs3wzPiWSHG2' ? (
        <section className='ap'>
          {
            apext ? null : <button id='add-product-btn' onClick={() => setApext(!apext)}>Add Product</button>
          }
          {apext ? (
            <div className='apext'>
              <MdOutlineTransitEnterexit className='exit-btn-ad' onClick={() => setApext(!apext)} />
              <h1>Adding a product</h1>
              <div className='name-price'>
                <div>
                  <p>Name:</p>
                  <input type='text' value={productName} onChange={(e) => setProductName(e.target.value)}></input>
                </div>
                <div>
                  <p>Price:</p>
                  <input type='number' value={productPrice} onChange={(e) => setProductPrice(e.target.value)}></input>
                </div>
              </div>
              <div className='text-editor'>
                <p>Description:</p>
                <ReactQuill modules={modules} theme="snow" value={productDescription} onChange={setProductDescription} id='editor-itself' />
              </div>
              <div>
                <p>Select photo of your product:</p>
                <input type="file" accept=".jpeg,.jpg,.png" onChange={(event) => {
                  setProductImageUpload(event.target.files[0]);
                }} />
              </div>
              <button
                id='sbmt-btn'
                className={productName !== '' && productDescription !== '' && productPrice !== 0 && productImageUpload !== null ? 'active' : ''}
                onClick={uploadProductPhoto}
                disabled={productName === '' || productDescription === '' || productPrice === 0 || productImageUpload === null}
              >Submit</button>
            </div>
          ) : null}
        </section>
      ) : null) : null}
      <main>
        <div className='catalog'>
          {productsList.map((product) => (
            <div className='product-container'>
              <div className='product-wrapper'>
                {user ? (user.uid === '0I7n46QjZIPZsfhMHs3wzPiWSHG2' ? <MdOutlineDeleteOutline id='delete-product' onClick={() => deleteProductHandler(product.id)} /> : null) : null}
                <Link to={`/product/${product.id}`}>
                  <img src={product.img} alt='product' />
                  <h1>{product.name}</h1>
                  <p id='price-tg'>$ {product.price}</p>
                </Link>
                <div>
                  <button id='add-to-cart-btn' onClick={() => addHandler(product.id)}><FaCartArrowDown /> Add to Cart</button>
                  <Link to={`/product/${product.id}`}><button id='more-btn'>More</button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <div className='foot'>
        <img src={logo} alt='logo' />
        <h1>Nourishing Your Body & Planet</h1>
        <li><p>© 2024 Dwell Well Inc.</p></li>
      </div>
    </>
  )
}
