import { NavLink } from "react-router-dom"

export const Navigation = () => {
    return( 
    <div className="Header-div">
        <h1>Tasty Burger</h1>
        <nav>
            <ul>
                <li><NavLink to={"/"}>Home</NavLink></li>
                <li><NavLink to={"/Booking"}>Booking</NavLink></li>
                <li><NavLink to={"/Contact"}>Contact</NavLink></li>
                <li><NavLink to={"/Admin"}>Admin</NavLink></li>
            </ul>
        </nav>
    </div>
    );
};