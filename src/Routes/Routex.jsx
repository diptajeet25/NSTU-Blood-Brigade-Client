import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layout/AuthLayout";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import DonarLayout from "../Layout/DonarLayout";
import RequestLayout from "../Layout/RequestLayout";
import VerifyEmail from "../Pages/VerifyUser";
import AllRequest from "../Layout/AllRequest";
import AllDonar from "../Layout/AllDonar";
import MyProfile from "../Layout/MyProfile";
import MyRequests from "../Pages/MyRequests";

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

  },
  {
    path:"/requestBlood",
    element:<RequestLayout></RequestLayout>
  },
  {
    path:"/verify-email",
    element:<VerifyEmail></VerifyEmail>
  },
  {
    path:"/requests",
    element:<AllRequest></AllRequest>
  },
  {
    path:"/donors",
    element:<AllDonar></AllDonar>
  },
  {
    path:"/profile",
    element:<MyProfile></MyProfile>
  },
  {
    path:"/myrequests",
    element:<MyRequests></MyRequests>
  }
]);
export default router;