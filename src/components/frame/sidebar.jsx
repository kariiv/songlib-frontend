import React, {useState, useRef} from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

let side;
const Sidebar = ({children, toggled}) => {
    side = useRef(null);
    return (
        <ul ref={side} className={"navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" + (toggled? ' toggled':'')}>
            {children}
        </ul>
    )
}

let drops = []

Sidebar.toggle = () => side.current.classList.toggle('toggled')
Sidebar.hideDrops = () => {
    drops.forEach(drop => drop.show ? drop.setShow(false) : null);
    drops = []
}

export default Sidebar;

export const SidebarHead = ({icon, brand}) =>
    <React.Fragment>
        <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to={'/'}>
            <div className="sidebar-brand-icon rotate-n-15">
                <i className={"fas " + icon}/>
            </div>
            <div className="sidebar-brand-text mx-3">{brand}</div>
        </NavLink>
        <hr className="sidebar-divider my-0"/>
    </React.Fragment>


export const Devider = ({className}) => <hr className={"sidebar-divider " + className}/>

export const SidebarToggle = () => {
    return (<div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" onClick={Sidebar.toggle}/>
    </div>)
}

export const NavHeader = ({label}) =>
    <div className="sidebar-heading"> {label || ''}</div>

export const NavItem = ({label, icon, to, isActive, badge}) =>
    <Nav.Item>
        <NavLink exact className='nav-link' isActive={isActive || null} to={to|| '/'} onClick={()=> Sidebar.hideDrops()}>
            <i className={`fas fa-fw ${icon || ''}`}/>
            {badge && <span className={"badge badge-counter" + (badge.type ? badge.type: ' badge-danger')}>{badge.text}</span>}
            <span> {label || ''}</span>
        </NavLink>
    </Nav.Item>


export const NavDrop = ({label, icon, children, isActive, badge}) => {
    const [show, setShow] = useState(false);

    drops.push({show, setShow});
    return (<li className="nav-item">
    <NavLink isActive={isActive} className={"nav-link" + (!show?" collapsed":'')} to='#' data-toggle="collapse" onClick={(e) => {
        e.preventDefault();
        Sidebar.hideDrops();
        setShow(!show);
    }} >
        <i className={`fas fa-fw ${icon || ''}`}/>
        {badge && <span className={"badge badge-counter" + (badge.type ? badge.type: ' badge-danger')}>{badge.text}</span>}
        <span> {label || ''}</span>
    </NavLink>
    <div className={"collapse" + (show?" show":'')} data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
            {children}
        </div>
    </div>
    </li>)
}

export const DropHeader = ({label}) =>
    <h6 className="collapse-header"> {label}</h6>

export const DropItem = ({label, to, icon, isActive, badge}) =>
    <NavLink exact className="collapse-item" isActive={isActive || null} to={to|| '#'} onClick={Sidebar.hideDrops}>
        {icon && <i className={'fa fa-fw '+icon} aria-hidden="true"/>} {label || ''}
        {badge && <span className={"badge badge-counter ml-1" + (badge.type ? badge.type: ' badge-danger')} style={{float:'right'}}>{badge.text}</span>}
    </NavLink>

