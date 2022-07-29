import './index.scss'
import {NavLink, Route, Routes} from "react-router-dom";
import Home from "../../../views/Home";
import Todo from "../../../views/Todo";
import Calculator from "../../../views/Calculator";
import QRCode from "../../../views/QRCode";
import * as React from "react";
import {Fragment} from "react";
import NumberCount from "../../../views/NumberCount";

const NavBar = () => {
    let activeClassName = "nav-header--active";
    let pages = [
        {name: 'Home Page', to: '/'},
        {name: 'Todo Page', to: '/todo'},
        {name: 'Calculator Page', to: '/calculator'},
        {name: 'Render QR Page', to: '/render-qr'},
        {name: 'Count Page', to: '/counter'}
    ]
    let listPageRender = pages.map((page, index)=>
        <ul key={index}>
            <li>
                <NavLink  to={page.to}  className={({ isActive }) => isActive ? activeClassName : undefined}>{page.name}</NavLink>
            </li>
        </ul>)
    return(
        <Fragment>
            <nav className="nav-header">
                {listPageRender}
            </nav>
            <div className="page-container">
                <Routes>
                    <Route path={"/"} element={<Home/>}></Route>
                    <Route path={"/todo"} element={<Todo/>}></Route>
                    <Route path={"/calculator"} element={<Calculator/>}></Route>
                    <Route path={"/render-qr"} element={<QRCode/>}></Route>
                    <Route path={"/counter"} element={<NumberCount/>}></Route>
                </Routes>
            </div>
        </Fragment>
    )
}

export default NavBar;
