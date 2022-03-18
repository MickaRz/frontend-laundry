import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <nav>
            <NavLink exact activeClassName="active" to="/pages/Login">
                Login
            </NavLink>
            <NavLink exact activeClassName="active" to="/pages/Member">
                Member
            </NavLink>
            <NavLink exact activeClassName="active" to="/pages/Paket">
                Paket
            </NavLink>
            <NavLink exact activeClassName="active" to="/pages/User">
                User
            </NavLink>
        </nav>
    )
}

export default Header
