import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddNotePage from "../Pages/Home/AddNotePage/AddNotePage";
import Home from "../Pages/Home/Home/Home";
import NoteDetails from "../Pages/Home/NoteDetails/NoteDetails";
import Login from "../Pages/Home/Shared/Login/Login";
import Signup from "../Pages/Home/Shared/Signup/Signup";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import MyProfile from "../Pages/Home/MyProfile/MyProfile";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <PrivetRoute><Home></Home></PrivetRoute>
            },
            {
                path: '/addnote',
                element: <PrivetRoute><AddNotePage></AddNotePage></PrivetRoute>
            },
            {
                path: '/note/:id',
                loader: async ({params}) => fetch(`https://mypaste.vercel.app/note/${params.id}`),
                element: <PrivetRoute><NoteDetails></NoteDetails></PrivetRoute>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/myprofile',
                element: <MyProfile></MyProfile>
            },
        ]
    }
])