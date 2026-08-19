import "./navbar.scss";

function Navbar()
{
    return(
        <div className="navbar">
        <div className="logo">
            <img src="logo.svg" alt="" />
            <span>My App</span>
        </div>
        <div className="icons">
            <img src="search.svg" className="icon" alt="" />
            <img src="app.svg" className="icon" alt="" />
            <img src="expand.svg" className="icon" alt="" />
            <div className="notification">
                <img src="notification.svg" alt="" />
                <span>1</span>
            </div>
            <div className="user">
                <img src="" alt="" />
                <span>Mohamed</span>
            </div>
            <img src="settings.svg" className="icon" alt="" />
        </div>
        </div>
    )
}
export default Navbar