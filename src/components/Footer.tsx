import '../styles/Footer.scss'; 


export const Footer = () => {
    return( 
        <>
        <footer>
           <div className='container-footer'>
            <div className='row-footer'>
                <div className='col-footer'>
                    <div className='logo-footer'>
                       <a href="/"> <img src="TastyBurgerImg/logo-tasty.png" alt="logo"/></a>
                    </div>
                        </div>

                        <div className='col-footer'>
                <h4>Welcome !</h4>
                    <ul> 
                        <li><a href="/">Home</a></li>
                        <li><a href="/">Menu</a></li>
                        <li><a href="/">About us</a></li>
                        <li><a href="/">Contact us</a></li>
                    </ul>
                        </div>
                        <div className='col-footer'>
                <h4>More about us...</h4>
                    <ul> 
                        <li><a href="/">Blogg</a></li>
                        <li><a href="/">Gallery</a></li>
                        <li><a href="/">Recipes</a></li>
                        <li><a href="/">Our team</a></li>
                    </ul>
                        </div>
                        
                </div>
            </div>
        </footer>
        
        </>
    );
};