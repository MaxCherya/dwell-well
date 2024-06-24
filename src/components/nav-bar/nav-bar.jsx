import React, { useState, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './styles.css'
import { CartContext } from '../../CartContext';

//media
import logo from '../../imgs/logo.png';

//icons
import { FaShoppingCart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

export default function NavBar() {

    const [showMenu, setShowMenu] = useState(false);
    const { cartList } = useContext(CartContext);

    return (
        <nav>
            <Link to={'/'}><img src={logo} alt='Home' id='logo' /></Link>
            <div className='menu' onClick={() => setShowMenu(!showMenu)}>
                <IoMenu />
                {cartList.length < 1 ? null : <span className="dot-menu"></span>}
            </div>
            <ul className={showMenu ? 'open' : ''}>
                <li><NavLink to={'/shop'} className='text-link'>Shop</NavLink></li>
                <li><NavLink to={'/about'} className='text-link'>About</NavLink></li>
                <li><NavLink to={'/contacts'} className='text-link'>Contacts</NavLink></li>
                <li>
                    <div id='cart-text'>
                        <NavLink to={'/cart'} className='text-link'><FaShoppingCart /></NavLink>
                        {cartList.length < 1 ? null : <span className="dot">{cartList.length}</span>}
                    </div>
                </li>
            </ul>
            <div id='cart'>
                <Link to={'/cart'}><FaShoppingCart /></Link>
                {cartList.length < 1 ? null : <span className="dot">{cartList.length}</span>}
            </div>
        </nav>
    )
}
