import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import {NavItems} from './NavItems'

const NavbarItem = ({item}) =>{
    return (
        <div>
            <NavLink to={item.path} className='nav-link'>
                <button className='nav-button'>
                <div className='title-theme' style={{display:'flex',flexDirection:'row'}}>
                    <div className="icon">{item.icon}</div>
                    <div className="text-md" style={{marginLeft:'5px'}}>{item.title}</div>
                </div>
                </button>
            </NavLink>
        </div>
    )
}

function Navbar() {
    
  return (
    <div className='nav'>
        {NavItems && NavItems.map((item,index)=>
            <NavbarItem key={index} item={item}/>
        )}
        <div className='circle'>
            <img src='https://i.ibb.co/7t7GK9X/circle-1.png' alt='profile' className='profile'/>
        </div>
    </div>
  )
}

export default Navbar