import './App.css'

import { Route, Routes } from 'react-router-dom'

import { NotificationProvider } from './context/NotificationContext'
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'


import Header from './components/Header/Header'
import Home from './components/Pages/Home/Home'
import Shop from './components/Pages/Shop/Shop'
import Waterpump from './components/Pages/Shop/Waterpump/Waterpump'
import IrrigationSystems from './components/Pages/Shop/IrrigationSystems/IrrigationSystems'
import Parts from './components/Pages/Shop/Parts/Parts'
import PowerMachines from './components/Pages/Shop/PowerMachines/PowerMachines'
import Pipes from './components/Pages/Shop/Pipes/Pipes'
import Tools from './components/Pages/Shop/Tools/Tools'
import Details from './components/Pages/Details/Details'
import Create from './components/Pages/CreateProduct/Create'
import Register from './components/Pages/Register/Register'
import EditProduct from './components/Pages/EditProduct/EditProduct'
import Favorite from './components/Pages/FavoritePage/Favorite'
import BuyProducts from './components/Pages/BuyProducts/BuyProducts'
import Search from './components/Pages/SearchPage/Search'
import LastSeen from './components/Pages/Shop/LastSeen/LastSeen'
import Footer from './components/Footer/Footer'
import Services from './components/Pages/Services/Services'

import ErrorPage from './components/Pages/404/ErrorPage'
import Comingsoon from './components/Pages/ComingSoon/Comingsoon'



function App() {


  return (
    <NotificationProvider>
      <AuthProvider>
        <ProductProvider>
          <Header />
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/create' element={<Create />} />
              <Route path='/favorite' element={<Favorite />} />
              <Route path='/search' element={<Search />} />
              <Route path='/buy' element={<BuyProducts />} />
              <Route path='/lastSeen' element={<LastSeen />} />
              <Route path='/services/:type' element={<Services />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/shop/waterpumps' element={<Waterpump />} />
              <Route path='/shop/irigationSystems' element={<IrrigationSystems />} />
              <Route path='/shop/parts' element={<Parts />} />
              <Route path='/shop/powerMachines' element={<PowerMachines />} />
              <Route path='/shop/pipes' element={<Pipes />} />
              <Route path='/shop/tools' element={<Tools />} />
              <Route path='/shop/:type/:id' element={<Details />} />
              <Route path='/shop/:productType/:productId/edit' element={<EditProduct />} />
              <Route path='/comingSoon' element={<Comingsoon />} />
              <Route path='/*' element={<ErrorPage />} />
            </Routes>
          </div>
          <Footer/>
        </ProductProvider>
      </AuthProvider>
    </NotificationProvider>
  )
}

export default App
