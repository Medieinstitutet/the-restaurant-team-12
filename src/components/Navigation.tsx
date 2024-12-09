import { NavLink } from "react-router-dom"

export const Navigation = () => {
    return( 
        <header>
    <div className="Header-div">
        <div className="logo">
        <img src="TastyBurgerImg/logo-tasty.png" alt="" />
        </div>
        <nav>
            <ul>
                <li><NavLink to={"/"}>Home</NavLink></li>
                <li><NavLink to={"/Booking"}>Booking</NavLink></li>
                <li><NavLink to={"/Contact"}>Contact</NavLink></li>
                <li><NavLink to={"/Admin"}>Admin</NavLink></li>
            </ul>
        </nav>
    </div>
    </header>
    );
};