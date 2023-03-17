import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddNotePage from "../Pages/Home/AddNotePage/AddNotePage";
import Home from "../Pages/Home/Home/Home";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/addnote',
                element: <AddNotePage></AddNotePage>
            }
        ]
    }
])