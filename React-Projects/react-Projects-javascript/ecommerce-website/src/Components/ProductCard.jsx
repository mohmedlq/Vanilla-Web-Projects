import { Link } from "react-router-dom"
export default function ProductCard({product})
{
    return(
       
                <div key={product.id} className="product-card">
                <img src={product.image} className="product-card-image" alt="" />
                <div className="product-card-content">
                    <h2 className="product-card-name">{product.name}</h2>
                    <span className="product-card-price">{product.price}</span>
                    <div className="product-card-actions">
                        <Link className="btn btn-secondary">View Details</Link>
                        <button className="btn btn-primary">add to cart </button>
                    </div>
                </div>
            </div>
    )
}