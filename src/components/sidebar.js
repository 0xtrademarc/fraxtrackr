import React from "react";
import ReactDOM from "react-dom"
import { useState } from "react";
import  { Menu } from '@mui/icons-material/';
import SidebarData from "./sidebarData";
import './sidebar.css'
import { Link } from "react-router-dom"


const Sidebar = () => {
    // initial value of sidebar = false
    // setSidebar(x) is like saying sidebar = x;
    const [sidebar, setSidebar] = useState(false);
    // whenever setSidebar is called, invert sidebar
    const showSidebar = () => setSidebar(!sidebar);

    return(

        <div>

            <div className = "navbar">
                <Menu className = "menu-button" onClick = {showSidebar}/>
            </div>

            <nav className = {sidebar ? "sidebar-show" : "sidebar-show"}>
                <ul className = "sidebar-list">
                        {SidebarData.map((element, index) => {
                            return (
                                <li key = {index} className = {element.className}>
                                    <a>  
                                        {element.icon}
                                        {element.title}
                                    </a>
                                </li>
                            );
                        })}

                </ul>
            </nav>

        </div>
    )
}

export default Sidebar;