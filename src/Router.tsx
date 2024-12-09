import { createBrowserRouter } from "react-router-dom";
import  {Booking}  from "./pages/Booking";
import  {Contact}  from "./pages/Contact";
import  {Home}  from "./pages/Home";
import  {NotFound}  from "./pages/NotFound";
import { Admin } from "./pages/Admin";
import { Layout } from "./pages/Layout"; 

export const router = createBrowserRouter ( [
    {
        path: "/",
        element: <Layout/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: "/",
                element: <Home/>,
                index: true,
            },
            {
                path: "/Booking",
                element: <Booking/>
            },
            {
                path: "/Contact",
                element: <Contact/>
      
            },
            {
                path: "/Admin",
                element: <Admin/>
      
            },
        ]
    }
])
