import {
    createBrowserRouter
  } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../layouts/Root";
import ErrorPage from "../Pages/Shared/ErrorPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllPets from "../Pages/AllPets/AllPets";
import AllFoods from "../Pages/AllFood/AllFoods";
import PetDetails from "../Pages/PetDetails/PetDetails";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";
import AddPets from "../Pages/AddPets/AddPets";
import Payment from "../Pages/payment/Payment";
import WishList from "../Pages/WishList/WishList";
import MyPets from "../Pages/MyPets/MyPets";
import EditPet from "../Pages/EditPets/EditPet";
import PrivateRoutes from "./PrivateRoutes";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<ErrorPage></ErrorPage>,
      children: [
        {
            path:'/',
            element:<Home></Home>,
        },
        {
            path:'/all-pets',
            element:<AllPets></AllPets>,
        },
        {
            path:'/pets/:id',
            element: <PetDetails></PetDetails>,
        },
        {
           path:'/my-pets',
           element:<PrivateRoutes><MyPets></MyPets></PrivateRoutes>,
        },
        {
          path:'/wishlist',
          element:<PrivateRoutes><WishList></WishList></PrivateRoutes>,
        },
        {
          path:'/add-pets',
          element:<PrivateRoutes><AddPets></AddPets></PrivateRoutes>,
      },
      {
         path: '/edit-pet/:id',
         element:<PrivateRoutes><EditPet></EditPet></PrivateRoutes>,
      },
      {
        path:'/pet-food',
        element:<AllFoods></AllFoods>,
      },
      {
        path:'/foods/:id',
        element: <FoodDetails></FoodDetails> ,
    },
    {
       path: '/payment',
       element:<PrivateRoutes><Payment></Payment></PrivateRoutes>,
    },
        {
            path:"/login",
            element:<Login></Login>,
        },
        {
            path:"/register",
            element:<Register></Register>,
        },
      ]
},
]);