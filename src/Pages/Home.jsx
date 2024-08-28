import { useContext, useEffect } from "react"
import { MyContext } from "../App"
import { Link } from "react-router-dom"
export default function Home() {
    const { data, copyData, setCopyData, itemsInCart, setItemsInCart,
        auth, warningMessage, setWarningMessage,counter} = useContext(MyContext)

    useEffect(() => {
        setCopyData(data)
    }, [data])


    function filterRating() {
        setCopyData(data.filter(pro => pro.rating > 3.5))
    }
    function filterAll() {
        setCopyData(data)
    }
    function filterCategory(cat) {
        setCopyData(data.filter(pro => pro.category === cat))
    }

    function addToCart(id) {
        if (localStorage.getItem("username") === localStorage.getItem("loginUsername")
            && localStorage.getItem("password") === localStorage.getItem("loginPass")) {

            if (itemsInCart.findIndex(item => item.id === id) === -1) {
                setItemsInCart(prevData => ([...prevData, ...data.filter(da => da.id === id).map(da=>({
                    ...da,
                    count:counter
                }))]))
            } else {
                setItemsInCart(prevData => [...prevData])
            }
        } else {
            setItemsInCart(prevData => [...prevData])
        }
    }
    console.log(itemsInCart)
    return (
        <div className="container">
            {warningMessage && <div className="warning">
                <p className="warningText">You need to sign-in to add to the cart</p>
                <button onClick={() => setWarningMessage(false)} className="btn btn-info OkayBtn">Okay!</button>
            </div>}
            <div className="filtering-buttons">
                <button className="btn btn-primary" onClick={filterAll}>All</button>
                <button className="btn btn-primary" onClick={filterRating}>Top rated</button>
                <button className="btn btn-primary" onClick={() => filterCategory("beauty")}>Beauty</button>
                <button className="btn btn-primary" onClick={() => filterCategory("fragrances")}>Fragrances</button>
                <button className="btn btn-primary" onClick={() => filterCategory("furniture")}>Furniture</button>
                <button className="btn btn-primary" onClick={() => filterCategory("groceries")}>Groceries</button>
            </div>
            <div className="all-products">
                {
                    data && data.length > 0 ?
                        copyData.map(pro =>
                            <div key={pro?.id} className="products-container">
                                <img width="100%" src={pro.thumbnail} alt="product-image" />
                                <div className="aboutProduct">
                                    <h3 className="title">{pro.title}</h3>
                                    {pro.availabilityStatus === "Low Stock" && <div className="Limited">Limited in Stock</div>}
                                    <p className="price"><span>$</span>{pro.price}</p>
                                    <p className="category">Category: {pro.category}</p>
                                    <p className="category">Rating: {pro.rating}</p>
                                    <div className="product-buttons">
                                        <Link to={`product/${pro.id}`}><button className="details-button btn btn-secondary">Details</button></Link>
                                        {auth && <button onClick={() => (addToCart(pro.id))} className="add-button btn btn-secondary">
                                            {itemsInCart.findIndex(item => item.id === pro.id) === -1 ? "Add to Card" : "Added to card"}</button>}
                                        {!auth && <button onClick={() => setWarningMessage(true)} className="add-button btn btn-secondary">Add to Card</button>}
                                    </div>
                                </div>
                            </div>)
                        :
                        <p className="loading">Loading data...</p>
                }
            </div>
        </div>
    )
}