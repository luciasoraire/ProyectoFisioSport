import React, { useEffect, useState } from "react";
import Logo from './../../assets/logoblanco.png'
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDashboard } from "react-icons/md";
import { closeSesion } from "../../Redux/Actions/Actions";
import Cookies from 'js-cookie';


const NavBar = () => {

    const [clicked, setClicked] = useState(false);
    const userAuth = useSelector(state => state.userAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
        setClicked(!clicked);
    }

    const handleLogout = () => {
        dispatch(closeSesion())
        Cookies.remove('token');
        navigate('/')
    }

    return (


        <><div className="navbar">
            <nav>
                <a href="#">
                    <img src={Logo} alt="" className='logo' />
                </a>
                <div className="itemsnavbar">
                    <ul id='navbar' className={clicked ? "#navbar active" : "#navbar"}>
                        <li className="itemnavbar">
                            <NavLink to="/#"><i class="fa-solid fa-house "></i><NavLink to="/"> Inicio</NavLink></NavLink>
                        </li>
                        {userAuth.authenticated && <li className="itemnavbar">
                            <i class="fa-solid fa-calendar"></i> <NavLink to="/turno"> Turnos</NavLink>
                        </li>}
                        <li className="itemnavbar">
                            <NavLink to="/contacto"><i class="fa-solid fa-phone"></i> Contacto</NavLink>
                        </li>



                        {
                            userAuth.authenticated && !userAuth.isAdmin && <li className="itemnavbar"><i class="fa-solid fa-circle-info"></i><NavLink to="/info" activeClassName="active">Información Personal</NavLink></li>
                        }
                        {
                            userAuth.isAdmin && <li className="itemnavbar">
                                <i class="fa-solid fa-table"></i> <NavLink to="/admin" activeClassName="active">Dashboard</NavLink>
                            </li>}
                        {
                            !userAuth.authenticated
                                ? <li className="itemnavbar"><NavLink to="/login" activeClassName="active"><i class="fa-solid fa-user"></i> Iniciar Sesión</NavLink></li>
                                : <li className="itemnavbar" id="cerrarsesion" onClick={handleLogout}>
                                    <NavLink to="/login" ><i class="fa-solid fa-user"></i> Cerrar Sesión</NavLink>
                                </li>
                        }



                    </ul>
                </div>
                <div id='mobile' onClick={handleClick}>
                    <i id='bar' className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>

                </div>
            </nav>
        </div>
        </>
    );
};

export default NavBar;