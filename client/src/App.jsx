import './App.css'

import { Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './components/Pages/Home/Home'

import { Shop } from './components/Pages/Shop/Shop'
import { Register } from './components/Users/Register/Register'

import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'


function App() {


  return (
    <NotificationProvider>
      <AuthProvider>

        <Header />
        <div className="App">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/register' element={<Register />} />

          </Routes>


        </div>
      </AuthProvider>
    </NotificationProvider>
  )
}

export default App
