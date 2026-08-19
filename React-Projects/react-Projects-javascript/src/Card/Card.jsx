import profilepic from './assets/Images/logo.png'
function Card()
{
    const handelClick=(e)=>e.target.style.display="none";
    return(
        <div className="card">
        <img onClick={(e)=>handelClick(e)} className='card-image' src={profilepic} alt="My Image"/>
         <h2 className='card-title'>Mohamed WebSite</h2>
         <p className='card-text'> I make Projects and sleep </p>
        </div>
    );
}

export default Card