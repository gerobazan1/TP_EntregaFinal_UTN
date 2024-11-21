import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "./firebase/firebaseConfig";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar"; 
import Home from "./components/Home"; 
import ProductDetail from "./components/ProductDetail"; 
import Register from "./components/Register"; 
import Login from "./components/Login"; 
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/register" element={<Register user={user}/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
