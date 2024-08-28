import SignIn from "./Components/auth/SignIn";
import SignUp from "./Components/auth/SignUp";
import Navbar from "./Components/Navbar/Navbar";

import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import { createContext, useEffect, useState } from "react";
import Cart from "./Pages/Cart";
import ProductDetails from "./Pages/ProductDetails";

export const MyContext = createContext()
function App() {
  const [data, setData] = useState([])
  const [copyData, setCopyData] = useState([])
  const [itemsInCart, setItemsInCart] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [sign, setSign] = useState("Sign-in");
  const [auth, setAuth] = useState(false)
  const [currentUser, setCurrentUser] = useState("User")
  const [warningMessage, setWarningMessage] = useState(false)
  const [counter,setCounter]=useState(1)
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(result => setData(result.products))
  }, [])
  useEffect(() => {
    if (localStorage.getItem("loginUsername") !== null) {
      setAuth(true)
    }
  }, [])
  useEffect(() => {
    auth ? setCurrentUser(localStorage.getItem("loginUsername")) : setCurrentUser("User")
  }, [auth])
  console.log(auth)
  return (
    <div className="" >
      <MyContext.Provider value={{
        data, setData, copyData, setCopyData, itemsInCart
        , setItemsInCart, username, setUsername, password, setPassword, sign, setSign
        , auth, setAuth, currentUser, setCurrentUser, warningMessage, setWarningMessage,
        counter,setCounter
      }}>

        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />

          {auth ? <Route path="/cart" element={<Cart />} /> : <Route path="/" element={<Home />} />}
          <Route path="/product/:prodID" element={<ProductDetails />} />
        </Routes>
      </MyContext.Provider>
    </div>
  );
}

export default App;
