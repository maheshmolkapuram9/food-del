import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Placeorder from "./pages/Place-order/Placeorder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/myorders/MyOrders";


function App() {

  const[showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/placeorder" element={<Placeorder/>}/>
          <Route path="/verify" element={<Verify/> } />
          <Route path="/myorders" element={<MyOrders/>} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
