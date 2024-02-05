import './Header.css'
import { Link } from 'react-router-dom'


import { useState } from 'react';
import { LoginModal } from '../Pages/LoginModal/LoginModal';
import { useAuthContext } from '../../context/AuthContext';
import { useProductContext } from '../../context/ProductContext';
import { useForm } from '../../hooks/useForm';
import { initialValuesSearch, initialFocusSearch } from '../../config/constants/search';




const Header = () => {
    const [openLogin, setOpenLogin] = useState(false);

    const { onLogout, isAuthenticated, isAdmin } = useAuthContext();
    const { favoriteProducts, buysProducts, onSearch } = useProductContext()

    const initialValues = initialValuesSearch;
    const initialFocs = initialFocusSearch;

    const onClose = () => {
        setOpenLogin(false)
    }


    const {
        values,
        focus,
        changeHandler,
        onSubmit,
        changeFocus
    } = useForm(
        initialValues,
        initialFocs,
        onSearch)
    return (
        <>
            <div className='nav_app'>
                <div className='logo'>

                    <Link to="/" className='a_Link'><p className='logo'><img src="https://rainsystems.eu/wp-content/uploads/Logo_Rain_Systems-mini.png" /></p>
                    </Link>

                </div>
                <div className="list">
                    <div className="searchbar">
                        <form method='POST' onSubmit={onSubmit}>
                            <input
                                required
                                onBlur={changeFocus}
                                focused={focus.searchName.toString()}
                                // pattern={inputValidtion.name}
                                type="text"
                                name='searchName'
                                placeholder="Serch..."
                                value={values.searchName}
                                onChange={changeHandler}
                            />
                            <button className="search"></button>
                        </form>
                    </div>
                    <Link to="/search" className="search" type="submit" value="Submit" ><i className="fa-solid fa-magnifying-glass"></i></Link>

                    <Link to="/shop" className='a_Link'><i className="fa-solid fa-shop "></i></Link>
                    
                    {!isAuthenticated && (
                            <span onClick={() => { setOpenLogin(true) }} className='a_Link login__a'><i className="fa-solid fa-user"></i></span>
                            
                    )}
                    {isAdmin && (
                            <Link to="/create" className='a_Link'><i className="fa-solid fa-square-plus  "></i></Link>
                      
                    )}
                    {isAuthenticated && (
                        <>
                            <Link to="/favorite" className='a_Link favorit-icon'><i className="fa-solid fa-heart "><i className='non-empty'>{favoriteProducts.length}</i></i></Link>
                            <Link to="/buy" className='a_Link cart-icon'><i className="fa-solid fa-cart-shopping "><i className='non-empty'>{buysProducts.length}</i></i></Link>

                            <span onClick={onLogout} className='a_Link'><i className="fa-solid fa-person-walking-dashed-line-arrow-right"></i></span>
                        </>
                    )}
                </div>
            </div>

            <LoginModal
                onOpen={openLogin}
                onClose={onClose}

            />
        </>
    );
}

export default Header;