import React, {useEffect} from 'react';
import {useLocation, useNavigate, useRoutes} from "react-router-dom";
import Login from "../Pages/Auth/Login";
import {GetProfile} from "../Repositories/auth";
import Layout from "../Theme/Layout";
import JobsList from "../Pages/Jobs/JobsList";
import JobsDetail from "../Pages/Jobs/JobsDetail";

const AppRouter = () => {
    const navigate=useNavigate()
    const location=useLocation()

    useEffect(() => {
        GetProfile().then((res) => {
            if (location.pathname==="/auth/login"){
                return navigate('/jobs')
            }
        }).catch((err) => {
            return navigate('/auth/login')
        }).finally(() => {

        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    let routes = useRoutes([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {
                    path: "/jobs",
                    element: <JobsList/>,
                },
                {
                    path: "/jobs/detail/:id",
                    element: <JobsDetail/>
                }
            ],
        },
        {
            path:"/auth/login",
            element: <Login/>
        },
        {
            path: "*",
            element: <Page404/>
        }
      ])
return routes
};

export default AppRouter;


const Page404 = () => {
    return (
        <div>
            Page 404
        </div>
    )
}