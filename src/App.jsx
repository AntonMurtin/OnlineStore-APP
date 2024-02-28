import './App.css';

import { Route, Routes } from 'react-router-dom';

import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';

import { UserGuard } from './components/RouteGuards/UserGuard';
import { AdmiGuard } from './components/RouteGuards/AdmiGuard';
import { AuthenticatedGuard } from './components/RouteGuards/AuthenticatedGuard';

import Header from './components/header/Header';
import Home from './components/pages/home/Home';
import Register from './components/pages/register/Register';
import Create from './components/pages/createProduct/Create';
import Search from './components/pages/searchPage/Search';
import Favorite from './components/pages/favoritePage/Favorite';
import BuyProducts from './components/pages/buyProducts/BuyProducts';
import Services from './components/pages/services/Services';
import Shop from './components/pages/shop/Shop';
import Details from './components/pages/details/Details';
import EditProduct from './components/pages/editProduct/EditProduct';
import Products from './components/pages/shopPoducts/Products';
import LastSeen from './components/pages/lastSeen/LastSeen';
import ErrorPage from './components/pages/404/ErrorPage';
import Comingsoon from './components/pages/comingSoon/Comingsoon';
import Footer from './components/footer/Footer';


function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <ProductProvider>
          <Header />
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route element={<UserGuard />}>
                <Route path='/register' element={<Register />} />
              </Route>
              <Route element={<AdmiGuard />}>
                <Route path='/create' element={<Create />} />
                <Route path='/shop/:type/:id/edit' element={<EditProduct />} />
              </Route>
              <Route element={<AuthenticatedGuard />}>
                <Route path='/favorite' element={<Favorite />} />
                <Route path='/buy' element={<BuyProducts />} />
                <Route path='/lastSeen' element={<LastSeen />} />
              </Route>
              <Route path='/search/:searchName' element={<Search />} />
              <Route path='/services/:type' element={<Services />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/shop/:type' element={<Products/>} />
              <Route path='/shop/:type/:id' element={<Details />} />
              <Route path='/comingSoon' element={<Comingsoon />} />
              <Route path='/*' element={<ErrorPage />} />
            </Routes>
          </div>
          <Footer />
        </ProductProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
