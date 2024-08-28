import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { MyContext } from "../App"

export default function ProductDetails() {
    const [showComments, setShowComments] = useState(false)
    const { prodID: prodId } = useParams()
    const { data } = useContext(MyContext)
    console.log(prodId)
    console.log(data)
    function handleShowComments() {
        setShowComments(prevShow => !prevShow)
    }
    return (
        <>
            {
                data && data.length > 0 ?
                    <div className="product-details-container">
                        <div className="details-container">
                            <img width="100%" height="250px" src={data[prodId - 1].thumbnail} alt="product-image" />
                            <div className="aboutProductDetails">
                                <h3 className="title">{data[prodId - 1].title}</h3>
                                <p className="price"><span style={{ fontWeight: 600, fontSize: 25 }}>Price: $</span>{data[prodId - 1]?.price}</p>
                                <h5 className="category">Rating: {data[prodId - 1]?.rating}</h5>
                                <p className="deliver">Available: {data[prodId - 1]?.availabilityStatus}</p>
                                <p className="deliver">Shipping: {data[prodId - 1]?.shippingInformation}</p>
                                <h5 className="category">Warranty: {data[prodId - 1]?.warrantyInformation}</h5>
                                <button className="toggleComments btn btn-info mb-3" onClick={handleShowComments}>{showComments ? "Hide comments on product" : "Show comments on product"}</button>
                                {
                                    showComments && <div className="comments">
                                        <p>{data[prodId - 1]?.reviews.map((review, index) => <span key={index}> {index + 1}- {review.comment} <br /> Reviewer email: {review.reviewerEmail} <br /> </span>)}</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="moreImagesForProduct">
                            {data[prodId - 1]?.images.map((img, index) => <div key={index} className="theImage">
                                <img src={img} alt="product-image" />
                            </div>)

                            }
                        </div>
                    </div>

                    :
                    <><p className="loading">Loading data...</p></>

            }
        </>
    )
}