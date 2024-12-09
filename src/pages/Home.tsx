import bannerVideo from '../video-banner/banner-video.mp4';
import '../styles/Home.scss'; 



export const Home = () => {
    return <>
  
     <div className='container'>
        <div className='overlay'></div>
         <video src={bannerVideo} autoPlay loop muted playsInline />
        <div className='content'>
            
        <h1>Welcome to TastyBurger: Where Burger Dreams Come True!</h1>
        <p>Book a table for dinner & elevate your dining experience with us. Book now and savor the moment</p>
         <a href="/Booking">RESERVE NOW!</a>
         </div>
    </div> 


 <div className="under-banner">
            <img src="TastyBurgerImg/grillade-hamburgers.jpg" alt="grillade burgers"/>
        </div>
    <section className='main-section'>
       
        <div className='main-text-content-container'>
            <div className='main-text-content'>
                <h3>Welcome!</h3>
                <p>TastyBurger is Sweden's oldest burger chain!
We started as early as 1890. The ambition is the same now as then, with the best ingredients we will serve the best burgers.</p>
            </div>
            <div className='main-img-container'>
            <div className='img-div item-1'>
                <h4>RIGHT NOW!</h4>
                <img src="TastyBurgerImg/burger-pommes.jpg" alt="" />
                <p>DOUBLE PORTIONS!</p>
            </div>
            <div className='img-div item-2'>
            <h4>NEW!</h4>
                <img src="TastyBurgerImg/bombastic-burger.jpg" alt="" />
                <p>BOMBASTIC BURGER!</p>
         </div>
            <div className='img-div item-3'>
            <h4>TAG US!</h4>
               <img src="TastyBurgerImg/influencer-burger.jpg" alt="" />
               <p>GET A MINI BURGER!</p>
            </div>
            </div>
        </div>
        <aside>
            <div>
            <img src="TastyBurgerImg/effekt-burger.png" alt="asidebild"/>
            </div>
        </aside>
    </section>
    </>;
};