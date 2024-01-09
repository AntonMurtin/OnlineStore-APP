import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {

    const onSubmit = () => {
        console.log('yes');

    }
    let isAuthenticated = true
    let isAdmin = true
    return (

        <div className='nav_app'>
            <div className='logo'>

                <Link to="/" className='a_Link'><p className='logo'><img src="https://rainsystems.eu/wp-content/uploads/Logo_Rain_Systems-mini.png" alt="" /></p>
                </Link>

            </div>
            <div className="list">
                <div className="searchbar">
                    <form method='POST' onSubmit={onSubmit}>
                        <input
                            type="text"
                            name="searchName"
                            placeholder="Serch..."
                        // value={values.searchName}
                        // onChange={changeHandler}

                        />
                        <button className="search"></button>
                    </form>
                </div>
                {/* <Link to="/search" className="search" type="submit" value="Submit" ><i className="fa-solid fa-magnifying-glass"></i></Link> */}

                <Link to="/shop" className='a_Link'><i className="fa-solid fa-shop"></i></Link>
                {!isAuthenticated && (
                    <>
                        <Link to="/login" className='a_Link'>Login</Link>
                        <Link to="/register" className='a_Link'>Register</Link>
                    </>
                )}
                {(
                    <>
                        <Link to="/create" className='a_Link'><i className="fa-solid fa-square-plus"></i></Link>
                        <Link to="/logout"  className='a_Link'><i className="fa-solid fa-person-walking-dashed-line-arrow-right"></i></Link>

                    </>
                )}
                {(
                    <>
                        <Link to="/favorit" className='a_Link favorit-icon'><i className="fa-solid fa-heart"><i className='non-empty'>{'favorits.length'}</i></i></Link>
                        <Link to="/buy" className='a_Link cart-icon'><i className="fa-solid fa-cart-shopping "><i className='non-empty'>{'products.length'}</i></i></Link>

                        <Link to="/logout" className='a_Link'><i className="fa-solid fa-person-walking-dashed-line-arrow-right"></i></Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;