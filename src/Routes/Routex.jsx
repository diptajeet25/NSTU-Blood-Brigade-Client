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
import EligbleDonors from "../Components/EligbleDonors";
import PrivateRoute from "./PrivateRoute";
import About from "../Pages/About";

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
    element:<PrivateRoute><DonarLayout></DonarLayout></PrivateRoute>

  },
  {
    path:"/requestBlood",
    element:<PrivateRoute><RequestLayout></RequestLayout></PrivateRoute>
  },
  {
    path:"/verify-email",
    element:<VerifyEmail></VerifyEmail>
  },
  {
    path:"/requests",
    element:<PrivateRoute><AllRequest></AllRequest></PrivateRoute>
  },
  {
    path:"/donors",
    element:<PrivateRoute><AllDonar></AllDonar></PrivateRoute>
  },
  {
    path:"/profile",
    element:<PrivateRoute><MyProfile></MyProfile></PrivateRoute>
  },
  {
    path:"/myrequests",
    element:<PrivateRoute><MyRequests></MyRequests></PrivateRoute>
  },
  {
    path:"/eligbleDonors/:_id",
    element:<PrivateRoute><EligbleDonors></EligbleDonors></PrivateRoute>,
  },
  {
    path:"/aboutUs",
    element:<About></About>
  }
]);
export default router;