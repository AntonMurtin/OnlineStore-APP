import './App.css'

import {Route, Routes} from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/Pages/Home/Home'
import { Shop } from './components/Pages/Shop/Shop'

function App() {


  return (
    <>
   
      <Header/>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/shop' element={<Shop/>}/>
        </Routes>

      
      </div>
    </>
  )
}

export default App
