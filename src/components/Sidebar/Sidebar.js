import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FiHome, FiLogOut } from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr"
import { CgInfo } from "react-icons/cg"
import { AiOutlineProfile } from "react-icons/ai"
import { MdManageAccounts } from "react-icons/md"

//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import './Sidebar.css';



const Sidebar = () => {
    let history = useHistory();
    const location = useLocation();

    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true)

    const handleMouseIn = () => {
        setMenuCollapse(false);
    };

    const handleMouseOut = () => {
        setMenuCollapse(true);
    };

    const handleHome = () => {
        history.push("/home")
    }

    const handleAdblog = () => {
        history.push("/addblog")
    }

    const handleSetting = () => {
        history.push("/settings")
    }

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        localStorage.removeItem("Username")
        localStorage.removeItem("userid")
        history.push("/")
    }


    return (
        <div id="header" style={location.pathname === "/" ? { display: "none" } : undefined}>
            {/* collapsed props to change menu size using menucollapse state */}
            <ProSidebar collapsed={menuCollapse} onMouseOver={handleMouseIn} onMouseOut={handleMouseOut}>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem active={location.pathname === "/home"} icon={<FiHome />} onClick={handleHome}>Home</MenuItem>
                        <MenuItem active={location.pathname === "/addblog"} icon={<GrAddCircle />} onClick={handleAdblog}>Add Blogg</MenuItem>
                        {/* <MenuItem active={location.pathname === "/myblogs"} icon={<AiOutlineProfile />} onClick={handleMyblog}>My Bloggs</MenuItem> */}
                        <MenuItem active={location.pathname === "/settings"} icon={<MdManageAccounts />} onClick={handleSetting}>Profile</MenuItem>
                        <MenuItem icon={<FiLogOut />} onClick={handleLogout}> Logout</MenuItem>
                        <MenuItem icon={<CgInfo />}>About</MenuItem>
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        </div>

    );
};

export default Sidebar;