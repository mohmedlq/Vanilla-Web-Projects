import "./product.scss"
import Single from "../../components/single/Single";
import {singleProduct} from "../../data"
 
function Product()
{
    return(
        <div>
            <Single{...singleProduct}/>
        </div>
    )

}
export default Product