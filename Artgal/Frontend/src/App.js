// import './App.css';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from "react-router-dom";
// import Login from "./screens/Login"
// import Signup from "./screens/Signup"
// import Profile from './screens/Profile';
// import Homepage from './screens/HomePage';
// import UploadPage from './screens/UploadPage';
// import View from './screens/View';
// import Cart from './screens/Cart';
// // import Footer from './screens/Footer';
// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route exact path="/login" element={<Login />}></Route>
//           <Route exact path="/upload" element={<UploadPage />}></Route>
//           <Route exact path="/signup" element={<Signup />}></Route>
//           <Route exact path="/" element={<Homepage />}></Route>
//           <Route exact path="/profile" element={<Profile />}></Route>
//           <Route exact path="/view" element ={<View/>}></Route>
//           <Route exact path="/cart" element ={<Cart/>}></Route>

//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login"
import Signup from "./screens/Signup"
import Profile from './screens/Profile';
import Homepage from './screens/HomePage';
import UploadPage from './screens/UploadPage';
import View from './screens/View';
import Cart from './screens/Cart';
import React, { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/upload" element={<UploadPage />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/view" element={<View setCart={setCart} />}></Route>
          <Route exact path="/cart" element={<Cart cart={cart} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;