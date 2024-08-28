import { useContext } from "react"
import { MyContext } from "../App"

export default function Cart() {
    const { itemsInCart, setItemsInCart} = useContext(MyContext)
    function add(id) {
        setItemsInCart(itemsInCart.map(item =>
            item.id === id ? { ...item, count: item.count + 1 } : item
        ))
    }
    function sub(id) {
        setItemsInCart(itemsInCart.map(item=>item.id===id?{...item,count:item.count-1}:item).filter(item=>item.count>0))
    }
    function handleDel(id) {
        setItemsInCart(itemsInCart.filter(item => item.id !== id))
    }
    console.log(itemsInCart)
    const totalPrice=itemsInCart.reduce((acc,item)=>acc=acc+item.price*item.count,0)
    
    return (
        <div className="Cart-container">
            <div className="totalPrice-container">

            {itemsInCart.length>0&&<h5 className="totalPrice">Total price: {totalPrice.toFixed(2)}$</h5>}
            </div>
            {itemsInCart && itemsInCart.length > 0 ?
                itemsInCart.map(item => <div key={item.id} className="cart-item">
                    <img src={item.thumbnail} alt="product-image" />
                    <div className="singleProduct">
                        <h3 className="title">{item.title}</h3>
                        {item.availabilityStatus === "Low Stock" && <div className="Limited">Limited in Stock</div>}
                        <p className="price"><span>$</span>{item.price}</p>
                        <p className="deliver">Available: {item.availabilityStatus}</p>
                        <p className="deliver">Shipping: {item.shippingInformation}</p>
                        <p className="category">Category: {item.category}</p>
                        <p className="category">Rating: {item.rating}</p>
                        <div className="cart-buttons">
                            <button className="deleteBtn btn btn-danger" onClick={() => handleDel(item.id)}>Delete</button>
                            <div className="counter-container ">
                                <button onClick={() => add(item.id)} className="plus  ">+</button>
                                <p className="count ">{item.count}</p>
                                <button onClick={() => sub(item.id)} className="minus ">-</button>
                            </div>
                        </div>
                    </div>
                </div>
                )

                :
                <div className="empty-cart">
                    <h1>Your cart is empty add something</h1>
                </div>
            }
        </div>
    )
}