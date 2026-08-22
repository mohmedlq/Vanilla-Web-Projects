import Single from "../../components/single/Single"
import "./user.scss"
import {singleUser} from "../../data"
function User()
{
return(
    <div className="user">
        <Single {...singleUser}/>
    </div>
)
}

export default User