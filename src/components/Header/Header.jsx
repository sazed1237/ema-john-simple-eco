// import React from 'react';
import './Header.css'
import logo from '../../assets/images/Logo.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const Header = () => {

    const {user, logOut} = useContext(AuthContext)


    const handleLogOut = () =>{
        logOut()
        .then(() =>{

        })
        .catch(error =>{
            console.log(error.message)
        })
    }

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/singup">Sing up</Link>
                {user && <span className='text-white'>Welcome {user.email} <button onClick={handleLogOut}>Log Out</button> </span> }
            </div>
        </nav>
    );
};

export default Header;