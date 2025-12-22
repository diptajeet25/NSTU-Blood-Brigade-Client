import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layout/AuthLayout";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import DonarLayout from "../Layout/DonarLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element:<RootLayout></RootLayout>,
    children: [
        {
            index:true,
            element:<Home></Home>
        }
    ]
  },
  {
    path:"/auth",
    element:<AuthLayout></AuthLayout>,
    children:[
      {
        index:true,
        element:<SignIn></SignIn>
      },
      {
        path:"signup",
        element:<SignUp></SignUp>
      }
    ]
  },
  {
    path:"/beADonor",
    element:<DonarLayout></DonarLayout>

  }
]);
export default router;