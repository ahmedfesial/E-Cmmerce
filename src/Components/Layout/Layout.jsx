import { Outlet } from "react-router-dom"
import Navbar from "../NavBar/Navbar"

const Layout = () => {
    return (
        <>
            <Navbar/>
        
            <Outlet/>

        <div className="p-5 text-white bg-slate-950 text-center">
            <h2 className="text-4xl">Footer</h2>
        </div>
        </>
        

    )
}

export default Layout  