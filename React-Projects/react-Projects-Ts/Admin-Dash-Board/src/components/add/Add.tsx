import type { GridColDef } from "@mui/x-data-grid"
import "./add.scss"
type Props={
slug:string,
columns:GridColDef[],
setOpen:React.Dispatch<React.SetStateAction<boolean>>
}
function Add(props:Props)
{
    return(
        <div className="add">
            <div className="model">
                <span className="close" onClick={()=>props.setOpen(false)}>
                </span>
                    <h1>Add new {props.slug}</h1>
                <form>
                    {props.columns.filter(item=>item.field!=="id" && item.field !== "img").map(column=>(
                        <div className="item">
                            <label htmlFor=""> {column.headerName}</label>
                            <input type={column.type} placeholder={column.field} />
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}
export default Add