import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import "./../styles/_Navigation.scss";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header>
        <Navigation/>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
};
