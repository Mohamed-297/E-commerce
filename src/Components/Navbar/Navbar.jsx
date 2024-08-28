import "./Navbar.css"
import cart from "../Assets/images/icon-cart.svg"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { MyContext } from "../../App"
export default function Navbar() {
    const { data, setCopyData, itemsInCart, sign, setSign, auth, setAuth, currentUser } = useContext(MyContext)
    const [searchedData, setSearchedData] = useState("")
    const navigate = useNavigate()
    function handleSearch(event) {
        navigate("/")
        event.preventDefault()
        setCopyData(data.filter(da => da.title.toLowerCase().includes(searchedData)))
    }
    useEffect(() => {
        if (localStorage.getItem("loginUsername") === null) {
            setSign("Sign-in")
        } else {

            setSign("Sign-out")
        }
    }, [auth])
    function handleSigning() {
        if (localStorage.getItem("loginUsername") === null) {
            navigate("/sign-in")
            // setSign("Sign-in")

        }
        else {
            localStorage.removeItem("loginUsername")
            localStorage.removeItem("loginPass")
            // setSign("Sign-out")
            setAuth(false)
            navigate("/")
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary nav">
            <div className="container-fluid">
                <Link className="logo navbar-brand" to={"/"}>Magnum</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to={"/"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/contact"}>Contact us</Link>
                        </li>
                    </ul>

                    <form onSubmit={handleSearch} className="d-flex me-auto" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search"
                            value={searchedData} onChange={(event) => setSearchedData(event.target.value.toLowerCase())} />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>

                    <div className="cart-container mr-1 ">
                        <Link to={auth ? "/cart" : "/sign-in"}><img src={cart} alt="cart" /></Link>
                        <span className="numberOfItemsInCart">{auth ? itemsInCart.reduce((acc,item)=>acc=item.count+acc,0) : 0}</span>
                    </div>

                    <ul className="navbar-nav  mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/sign-up"}>Register</Link>
                        </li>
                        <li onClick={handleSigning} className="nav-sign nav-item nav-link">
                            {/* <Link className="nav-link" to={"/sign-in"}>{ */}
                            {sign}
                            {/* }</Link> */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/"}>
                                {currentUser}</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}