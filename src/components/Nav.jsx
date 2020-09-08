import React, {Component} from 'react'
import {Link} from "react-router-dom";
import "../styles/nav.css"

export default class Nav extends Component{
    
    state={
        isOpen:false,
    }
    openMenu=()=>{
        return this.state.isOpen===false ? this.setState({isOpen: true}): this.setState({isOpen: false});
    }
    
    render(){
        
        let navClass = "navigation ";
        navClass += this.state.isOpen === true ? "" : "close";
        return (
            <nav className={navClass}>
                <div onClick={this.openMenu} className="menu-burger">
                    <div className="line one"></div>
                    <div className="line two"></div>
                    <div className="line three"></div>
                </div>
                <ul>
                    <li><Link to="/share">Share</Link></li>
                    <li><Link to="/stories">Stories</Link></li>
                    {/* <li>Posts</li> */}
                </ul>
            </nav>
        )
    }
    
}
